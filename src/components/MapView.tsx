import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import './styles/tailwind.css';

import useFacilities from '../hooks/useFacilities';
import { Facility } from '../types';

// Fix Leaflet default icon path issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';

// Configure default icons
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Default icon function - fallback if getIconByType doesn't work
const getDefaultIcon = (type: string) => {
  return L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41]
  });
};

const MapView: React.FC = () => {
  const { facilities, loading, error } = useFacilities();
  
  const defaultCenter: LatLngTuple = [19.0760, 72.8777]; // Mumbai
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultCenter);

  useEffect(() => {
    if (facilities && facilities.length > 0) {
      try {
        const latitudes = facilities.map((facility: Facility) => facility.location.latitude);
        const longitudes = facilities.map((facility: Facility) => facility.location.longitude);
        const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
        const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
        
        // Only update if we have valid coordinates
        if (!isNaN(avgLat) && !isNaN(avgLng)) {
          setMapCenter([avgLat, avgLng]);
        }
      } catch (err) {
        console.error('Error calculating map center:', err);
      }
    }
  }, [facilities]);

  // Debug logging
  console.log('MapView render:', { facilities, loading, error });

  if (error) {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Error loading map: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      {loading && (
        <div className="absolute top-2 left-2 z-[1000] bg-white px-3 py-1 rounded shadow">
          <p className="text-sm">Loading facilities...</p>
        </div>
      )}
      
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        key={`${mapCenter[0]}-${mapCenter[1]}`} // Force re-render when center changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {facilities && facilities.map((facility: Facility) => {
          // Validate coordinates
          if (!facility.location || 
              typeof facility.location.latitude !== 'number' || 
              typeof facility.location.longitude !== 'number' ||
              isNaN(facility.location.latitude) || 
              isNaN(facility.location.longitude)) {
            console.warn('Invalid facility coordinates:', facility);
            return null;
          }

          return (
            <Marker
              key={facility.id}
              position={[facility.location.latitude, facility.location.longitude]}
              icon={getDefaultIcon(facility.type)}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{facility.name || 'Unnamed Facility'}</h3>
                  <p>{facility.type || 'Unknown Type'}</p>
                  <p className="text-xs text-gray-500">
                    {facility.location.latitude.toFixed(4)}, {facility.location.longitude.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;



// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useFacilities } from '../hooks/useFacilities';
// import { Facility } from '../types';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// const MapView: React.FC = () => {
//   const { facilities, loading } = useFacilities();
//   const [mapCenter, setMapCenter] = useState(center);

//   useEffect(() => {
//     if (facilities.length > 0) {
//       const latitudes = facilities.map((facility: Facility) => facility.location.lat);
//       const longitudes = facilities.map((facility: Facility) => facility.location.lng);
//       const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
//       const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
//       setMapCenter({ lat: avgLat, lng: avgLng });
//     }
//   }, [facilities]);

//   return (
//     <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
//         {loading && <div>Loading...</div>}
//         {facilities.map((facility: Facility) => (
//           <Marker
//             key={facility.id}
//             position={{ lat: facility.location.lat, lng: facility.location.lng }}
//             icon={{
//               url: facility.type === 'hospital' ? '/assets/icons/hospital.svg' : 
//                    facility.type === 'pharmacy' ? '/assets/icons/pharmacy.svg' : 
//                    facility.type === 'clinic' ? '/assets/icons/clinic.svg' : 
//                    '/assets/icons/ambulance.svg',
//               scaledSize: new window.google.maps.Size(30, 30)
//             }}
//           />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapView;