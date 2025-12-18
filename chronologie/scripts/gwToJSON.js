import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = process.argv[2] || 'public/sample.gw';
const OUTPUT_FILE = process.argv[3] || 'output.json';

// --- Event Mappings --- Merci Gemini
const FAMILY_EVENT_MAP = {
    '#marr': 'Efam_Marriage',
    '#nmar': 'Efam_NoMarriage',
    '#nmen': 'Efam_NoMention',
    '#enga': 'Efam_Engage',
    '#div': 'Efam_Divorce',
    '#sep': 'Efam_Separated',
    '#anul': 'Efam_Annulation',
    '#marb': 'Efam_MarriageBann',
    '#marc': 'Efam_MarriageContract',
    '#marl': 'Efam_MarriageLicense',
    '#pacs': 'Efam_PACS',
    '#resi': 'Efam_Residence',
    '#strng': 'Efam_Name'
};

const PERSON_EVENT_MAP = {
    '#birt': 'Epers_Birth',
    '#bapt': 'Epers_Baptism',
    '#deat': 'Epers_Death',
    '#buri': 'Epers_Burial',
    '#crem': 'Epers_Cremation',
    '#acco': 'Epers_Accomplishment',
    '#acqu': 'Epers_Acquisition',
    '#adhe': 'Epers_Adhesion',
    '#bapl': 'Epers_BaptismLDS',
    '#barm': 'Epers_BarMitzvah',
    '#basm': 'Epers_BatMitzvah',
    '#bles': 'Epers_Benediction',
    '#cens': 'Epers_Recensement',
    '#chgn': 'Epers_ChangeName',
    '#circ': 'Epers_Circumcision',
    '#conf': 'Epers_Confirmation',
    '#conl': 'Epers_ConfirmationLDS',
    '#degr': 'Epers_Diploma',
    '#awar': 'Epers_Decoration',
    '#demm': 'Epers_DemobilisationMilitaire',
    '#dist': 'Epers_Distinction',
    '#endl': 'Epers_Dotation',
    '#dotl': 'Epers_DotationLDS',
    '#educ': 'Epers_Education',
    '#elec': 'Epers_Election',
    '#emig': 'Epers_Emigration',
    '#exco': 'Epers_Excommunication',
    '#flkl': 'Epers_FamilyLinkLDS',
    '#fcom': 'Epers_FirstCommunion',
    '#fune': 'Epers_Funeral',
    '#grad': 'Epers_Graduate',
    '#hosp': 'Epers_Hospitalisation',
    '#illn': 'Epers_Illness',
    '#immi': 'Epers_Immigration',
    '#lpas': 'Epers_ListePassenger',
    '#mdis': 'Epers_MilitaryDistinction',
    '#mpro': 'Epers_MilitaryPromotion',
    '#mser': 'Epers_MilitaryService',
    '#mobm': 'Epers_MobilisationMilitaire',
    '#natu': 'Epers_Naturalisation',
    '#occu': 'Epers_Occupation',
    '#ordn': 'Epers_Ordination',
    '#prop': 'Epers_Property',
    '#resi': 'Epers_Residence',
    '#reti': 'Epers_Retired',
    '#slgc': 'Epers_ScellentChildLDS',
    '#slgp': 'Epers_ScellentParentLDS',
    '#slgs': 'Epers_ScellentSpouseLDS',
    '#vteb': 'Epers_VenteBien',
    '#will': 'Epers_Will',
    '#strng': 'Epers_Name'
};

const individuals = new Map();
const families = [];


function cleanName(name) {
    return name.replace(/_/g, ' ');
}

function getIndividual(lastName, firstName, num = '0') {
    const cleanLast = cleanName(lastName);
    const cleanFirst = cleanName(firstName);
    // ID format: LastName FirstName.Number
    const id = `${cleanLast} ${cleanFirst}.${num}`;

    if (!individuals.has(id)) {
        individuals.set(id, {
            id,
            firstName: cleanFirst,
            lastName: cleanLast,
            number: num,
            sex: null,
            events: [],
            notes: [],
            sources: []
        });
    }
    return individuals.get(id);
}

function isDate(str) {
    return /\d/.test(str) && !str.startsWith('#') && !str.startsWith('http') && !str.startsWith('?');
}

function parseDate(dateStr) {
    if (!dateStr) return null;
    if (dateStr.startsWith('0(') && dateStr.endsWith(')')) {
        return dateStr.slice(2, -1).replace(/_/g, ' ');
    }
    return dateStr.replace(/_/g, ' ');
}

function addEvent(individual, newEvent) {
    // Check for duplicates
    const exists = individual.events.some(e =>
        e.type === newEvent.type &&
        e.date === newEvent.date &&
        (e.place === newEvent.place || (!e.place && !newEvent.place))
    );
    if (!exists) {
        individual.events.push(newEvent);
    }
}

// --- Main Parsing Logic ---

function parseGW(content) {
    const lines = content.split('\n');

    let currentFamily = null;
    let currentIndividual = null;
    let inFevt = false;
    let inPevt = false;
    let inBeg = false;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex].trim();
        if (!line || line.startsWith('%')) continue;

        const tokens = line.split(/\s+/);
        const command = tokens[0];

        if (command === 'fam') {
            let plusIndex = tokens.findIndex(t => t.startsWith('+'));
            if (plusIndex === -1) continue;

            // HUSBAND
            let hTokens = [];
            for (let i = 1; i < plusIndex; i++) {
                if (tokens[i].startsWith('#') || isDate(tokens[i])) break;
                hTokens.push(tokens[i]);
            }

            if (hTokens.length < 2) continue;
            const hLast = hTokens[0];
            const hFirstWithNum = hTokens[1];
            const [hFirst, hNum] = hFirstWithNum.split('.');
            const husband = getIndividual(hLast, hFirst, hNum || '0');
            husband.sex = 'm';


            // WIFE
            let wTokens = [];
            let foundWifeStart = false;
            let skipNext = false;

            for (let i = plusIndex; i < tokens.length; i++) {
                let t = tokens[i];

                if (skipNext) {
                    skipNext = false;
                    continue;
                }

                if (i === plusIndex && t.startsWith('+')) {
                    continue;
                }

                if (t.startsWith('#')) {
                    if (foundWifeStart) break;
                    if (['#mp', '#dp', '#bp', '#ms', '#src'].includes(t)) {
                        skipNext = true;
                    }
                    continue;
                }

                if (isDate(t) || t === '?') {
                    if (foundWifeStart) break;
                    continue;
                }

                foundWifeStart = true;
                wTokens.push(t);
            }

            if (wTokens.length >= 2) {
                const wLast = wTokens[0];
                const wFirstWithNum = wTokens[1];
                const [wFirst, wNum] = wFirstWithNum.split('.');
                const wife = getIndividual(wLast, wFirst, wNum || '0');
                wife.sex = 'f';

                currentFamily = {
                    husbandId: husband.id,
                    husbandLastName: husband.lastName,
                    wifeId: wife.id,
                    childrenIds: [],
                    events: []
                };
                families.push(currentFamily);
            }

            inFevt = false;
            inPevt = false;
            inBeg = false;
            currentIndividual = null;
        }

        else if (command === 'fevt') {
            inFevt = true;
        }
        else if (line === 'end fevt') {
            inFevt = false;
        }

        else if (command === 'beg') {
            inBeg = true;
        }
        else if (line === 'end') {
            inBeg = false;
        }

        else if (command === 'pevt') {
            const pLast = tokens[1];
            const pFirstWithNum = tokens[2];
            const [pFirst, pNum] = pFirstWithNum.split('.');

            currentIndividual = getIndividual(pLast, pFirst, pNum || '0');
            inPevt = true;
            inFevt = false;
            inBeg = false;
            currentFamily = null;
        }
        else if (line === 'end pevt') {
            inPevt = false;
            currentIndividual = null;
        }

        else if (inFevt && currentFamily) {
            const tag = tokens.find(t => t.startsWith('#'));
            if (tag && FAMILY_EVENT_MAP[tag]) {
                const event = {
                    type: FAMILY_EVENT_MAP[tag],
                    date: null,
                    place: null,
                    source: null
                };

                for (let i = 0; i < tokens.length; i++) {
                    const t = tokens[i];
                    if (isDate(t)) {
                        event.date = parseDate(t);
                    } else if (t === '#p') {
                        event.place = cleanName(tokens[i + 1] || '');
                        i++;
                    } else if (t === '#s' || t === 'src') {
                        event.source = (tokens[i + 1] || '');
                        i++;
                    }
                }
                currentFamily.events.push(event);
            }
        }

        else if (inBeg && currentFamily) {
            if (tokens[0] === '-') {
                const sex = tokens[1] === 'h' ? 'm' : (tokens[1] === 'f' ? 'f' : '?');

                let nameTokens = [];
                let i = 2;
                while (i < tokens.length) {
                    const t = tokens[i];
                    if (t.startsWith('#') || isDate(t) || t === '?') break;
                    nameTokens.push(t);
                    i++;
                }

                let cLast, cFirst;
                if (nameTokens.length === 1) {
                    cFirst = nameTokens[0];
                    cLast = currentFamily.husbandLastName;
                } else if (nameTokens.length >= 2) {
                    cFirst = nameTokens[0];
                    cLast = nameTokens[1];
                } else {
                    continue;
                }

                const child = getIndividual(cLast, cFirst, '0');
                if (child.sex === null) child.sex = sex;

                let birthDate = null;
                let birthPlace = null;

                for (; i < tokens.length; i++) {
                    if (isDate(tokens[i])) {
                        birthDate = parseDate(tokens[i]);
                    } else if (tokens[i] === '#bp') {
                        birthPlace = cleanName(tokens[i + 1] || '');
                        i++;
                    }
                }

                if (birthDate || birthPlace) {
                    addEvent(child, {
                        type: 'Epers_Birth',
                        date: birthDate,
                        place: birthPlace
                    });
                }

                currentFamily.childrenIds.push(child.id);
            }
        }

        else if (inPevt && currentIndividual) {
            const tag = tokens.find(t => t.startsWith('#'));
            if (tag && PERSON_EVENT_MAP[tag]) {
                const event = {
                    type: PERSON_EVENT_MAP[tag],
                    date: null,
                    place: null,
                    source: null,
                    note: null
                };

                for (let i = 0; i < tokens.length; i++) {
                    const t = tokens[i];
                    if (isDate(t)) {
                        event.date = parseDate(t);
                    } else if (t === '#p' || t === '#bp' || t === '#dp') {
                        event.place = cleanName(tokens[i + 1] || '');
                        i++;
                    } else if (t === '#s') {
                        event.source = (tokens[i + 1] || '');
                        i++;
                    } else if (t === 'note') {
                        event.note = tokens.slice(i + 1).join(' ');
                        break;
                    }
                }
                addEvent(currentIndividual, event);
            }
        }
    }

    return {
        individuals: Array.from(individuals.values()),
        families: families
    };
}

try {
    const content = fs.readFileSync(INPUT_FILE, 'utf8');
    const result = parseGW(content);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`Successfully converted ${INPUT_FILE} to ${OUTPUT_FILE}`);
    console.log(`Found ${result.individuals.length} individuals and ${result.families.length} families.`);
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
