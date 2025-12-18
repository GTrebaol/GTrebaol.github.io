import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
};

const Map = ({ events }) => {
    // Filter events with valid coordinates
    const markers = events.filter(ev => ev.lat && ev.lon);

    if (markers.length === 0) {
        return null;
    }

    const centerLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
    const centerLon = markers.reduce((sum, m) => sum + m.lon, 0) / markers.length;

    return (
        <div className="h-96 w-full rounded-lg overflow-hidden shadow-md border border-gray-200 z-0">
            <MapContainer center={[centerLat, centerLon]} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((ev, idx) => (
                    <Marker key={idx} position={[ev.lat, ev.lon]}>
                        <Popup>
                            <strong>{ev.type}</strong><br />
                            {ev.date}<br />
                            {ev.place}
                        </Popup>
                    </Marker>
                ))}
                <RecenterAutomatically lat={centerLat} lng={centerLon} />
            </MapContainer>
        </div>
    );
};

export default Map;
