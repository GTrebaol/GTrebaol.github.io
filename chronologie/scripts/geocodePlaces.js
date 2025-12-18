import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_JSON_PATH = path.join(__dirname, '../output.json');
const PLACES_JSON_PATH = path.join(__dirname, '../src/data/places.json');

let places = {};
if (fs.existsSync(PLACES_JSON_PATH)) {
    try {
        places = JSON.parse(fs.readFileSync(PLACES_JSON_PATH, 'utf-8'));
    } catch (e) {
        console.error("Error reading existing places.json:", e);
    }
}

let outputData = {};
try {
    outputData = JSON.parse(fs.readFileSync(OUTPUT_JSON_PATH, 'utf-8'));
} catch (e) {
    console.error("Error reading output.json:", e);
    process.exit(1);
}

const uniquePlaces = new Set();
const extractPlaces = (events) => {
    if (!events) return;
    events.forEach(ev => {
        if (ev.place) {
            uniquePlaces.add(ev.place);
        }
    });
};

outputData.individuals.forEach(ind => extractPlaces(ind.events));
outputData.families.forEach(fam => extractPlaces(fam.events));

console.log(`Found ${uniquePlaces.size} unique places.`);

const geocode = async (placeName) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&limit=1`;
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'ChronologieApp/1.0 (gwen.trebaol@gmail.com)'
            }
        });
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        }
    } catch (e) {
        console.error(`Error geocoding ${placeName}:`, e);
    }
    return null;
};

// Process places
const processPlaces = async () => {
    let changed = false;
    for (const placeName of uniquePlaces) {
        if (!places[placeName]) {
            console.log(`Geocoding: ${placeName}...`);
            const coords = await geocode(placeName);
            if (coords) {
                places[placeName] = coords;
                changed = true;
                console.log(`  -> Found: ${coords.lat}, ${coords.lon}`);
            } else {
                console.log(`  -> Not found.`);
                places[placeName] = { lat: null, lon: null, error: "Not found" };
                changed = true;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    if (changed) {
        fs.writeFileSync(PLACES_JSON_PATH, JSON.stringify(places, null, 2));
        console.log(`Updated ${PLACES_JSON_PATH}`);
    } else {
        console.log("No new places to geocode.");
    }
};

processPlaces();
