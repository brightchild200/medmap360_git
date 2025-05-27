import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import  useFacilities  from '../hooks/useFacilities';
import { Facility } from '../types';
import { getIconByType } from '../utils/mapHelpers';

// Fix Leaflet default icon path issue (optional if not using default icons)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView: React.FC = () => {
  const { facilities, loading } = useFacilities();

  const defaultCenter: LatLngExpression = [19.0760, 72.8777]; // Mumbai or your default city
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(defaultCenter);

  useEffect(() => {
    if (facilities.length > 0) {
      const latitudes = facilities.map((facility: Facility) => facility.location.latitude);
      const longitudes = facilities.map((facility: Facility) => facility.location.longitude);
      const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
      setMapCenter([avgLat, avgLng]);
    }
  }, [facilities]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {facilities.map((facility: Facility) => (
          <Marker
            key={facility.id}
            position={[facility.location.latitude, facility.location.longitude]}
            icon={L.icon({
              iconUrl: getIconByType(facility.type),
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30]
            })}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{facility.name}</h3>
                <p>{facility.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
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