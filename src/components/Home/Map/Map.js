import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const provider = new OpenStreetMapProvider();

const Map = ({ searchTerm, center = [20.9374, 77.7796], zoom = 8 }) => {
  const [mapCenter, setMapCenter] = useState(center);
  const mapRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      provider.search({ query: searchTerm }).then((results) => {
        if (results && results.length > 0) {
          const { y, x } = results[0];
          setMapCenter([y, x]);
          if (mapRef.current) {
            mapRef.current.flyTo([y, x], 13);  // Zoom level when a location is found
          }
        } else {
          console.warn('No results found for the search term:', searchTerm);
        }
      }).catch((error) => {
        console.error("Error fetching location:", error);
      });
    }
  }, [searchTerm]);

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%' }} 
      scrollWheelZoom={false}
      whenCreated={(map) => { mapRef.current = map; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapCenter}>
        <Popup>
          Location: {searchTerm}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
