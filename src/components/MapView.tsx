


//google map niche

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useFacilities from '../hooks/useFacilities';
import { Facility } from '../types';

const containerStyle = {
  width: '100%',
  height: '100vh' // Using viewport height but not full screen since it's embedded in a page
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapView: React.FC = () => {
  const { facilities, loading } = useFacilities();
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    if (facilities.length > 0) {
      // Filter facilities that have valid location data
      const validFacilities = facilities.filter(
        (facility: Facility) => 
          facility.location && 
          typeof facility.location.latitude === 'number' && 
          typeof facility.location.longitude === 'number'
      );

      if (validFacilities.length > 0) {
        const latitudes = validFacilities.map((facility: Facility) => facility.location.latitude);
        const longitudes = validFacilities.map((facility: Facility) => facility.location.longitude);
        const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
        const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
        setMapCenter({ lat: avgLat, lng: avgLng });
      }
    }
  }, [facilities]);

  // Function to get marker icon based on facility type
  const getMarkerIcon = (facilityType: string) => {
    const iconUrl = facilityType === 'hospital' 
      ? '/assets/icons/hospital.svg'
      : facilityType === 'pharmacy'
      ? '/assets/icons/pharmacy.svg'
      : facilityType === 'clinic'
      ? '/assets/icons/clinic.svg'
      : '/assets/icons/ambulance.svg';

    // Check if window.google is available
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      return {
        url: iconUrl,
        scaledSize: new window.google.maps.Size(30, 30)
      };
    }
    
    // Fallback - return just the URL
    return {
      url: iconUrl
    };
  };

  // Get the API key from environment variables
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Handle case where API key is not available
  if (!googleMapsApiKey) {
    return (
      <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Google Maps API key not found. Please check your environment variables.</div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        {loading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            Loading...
          </div>
        )}
        {facilities
          .filter((facility: Facility) => 
            facility.location && 
            typeof facility.location.latitude === 'number' && 
            typeof facility.location.longitude === 'number'
          )
          .map((facility: Facility) => (
            <Marker
              key={facility.id}
              position={{
                lat: facility.location.latitude,
                lng: facility.location.longitude
              }}
              icon={getMarkerIcon(facility.type)}
              title={facility.name || facility.type}
              onClick={() => {
                console.log('Marker clicked:', facility);
              }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;

// google map upar





// maptiler niche 

// import React, { useEffect, useRef, useState } from 'react';
// import * as maptilersdk from '@maptiler/sdk';
// import '@maptiler/sdk/dist/maptiler-sdk.css';
// import useFacilities from '../hooks/useFacilities';
// import { Facility } from '../types';


// const MapView: React.FC = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<maptilersdk.Map | null>(null);
//   const { facilities, loading } = useFacilities();
//   const [mapLoaded, setMapLoaded] = useState(false);

//   // Set your MapTiler API key
//   maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILER_API_KEY || '5HGLYGHxy3G5iOn3nRF7';

//   const center = [-38.523, -3.745]; // [lng, lat] - note the order is different from Google Maps

//   useEffect(() => {
//     if (map.current) return; // stops map from intializing more than once

//     if (!process.env.REACT_APP_MAPTILER_API_KEY && !maptilersdk.config.apiKey) {
//       console.error('MapTiler API key not found');
//       return;
//     }

//     map.current = new maptilersdk.Map({
//       container: mapContainer.current!,
//       style: maptilersdk.MapStyle.STREETS, // You can change this to other styles
//       // center: center,
//       zoom: 12
//     });

//     map.current.on('load', () => {
//       setMapLoaded(true);
//     });

//     return () => {
//       if (map.current) {
//         map.current.remove();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!map.current || !mapLoaded || facilities.length === 0) return;

//     // Clear existing markers
//     const existingMarkers = document.querySelectorAll('.custom-marker');
//     existingMarkers.forEach(marker => marker.remove());

//     // Filter facilities with valid location data
//     const validFacilities = facilities.filter(
//       (facility: Facility) => 
//         facility.location && 
//         typeof facility.location.latitude === 'number' && 
//         typeof facility.location.longitude === 'number'
//     );

//     if (validFacilities.length === 0) return;

//     // Calculate center point
//     const latitudes = validFacilities.map((facility: Facility) => facility.location.latitude);
//     const longitudes = validFacilities.map((facility: Facility) => facility.location.longitude);
//     const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
//     const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

//     // Update map center
//     map.current.setCenter([avgLng, avgLat]);

//     // Add markers for each facility
//     validFacilities.forEach((facility: Facility) => {
//       // Create custom marker element
//       const markerEl = document.createElement('div');
//       markerEl.className = 'custom-marker';
//       markerEl.style.width = '30px';
//       markerEl.style.height = '30px';
//       markerEl.style.backgroundSize = 'contain';
//       markerEl.style.backgroundRepeat = 'no-repeat';
//       markerEl.style.cursor = 'pointer';
      
//       // Set icon based on facility type
//       const iconUrl = facility.type === 'hospital' 
//         ? '/assets/icons/hospital.svg'
//         : facility.type === 'pharmacy'
//         ? '/assets/icons/pharmacy.svg'
//         : facility.type === 'clinic'
//         ? '/assets/icons/clinic.svg'
//         : '/assets/icons/ambulance.svg';
      
//       markerEl.style.backgroundImage = `url(${iconUrl})`;

//       // Create marker
//       const marker = new maptilersdk.Marker({ element: markerEl })
//         .setLngLat([facility.location.longitude, facility.location.latitude])
//         .addTo(map.current!);

//       // Add click event
//       markerEl.addEventListener('click', () => {
//         console.log('Facility clicked:', facility);
//         // You can add popup or other interactions here
//         new maptilersdk.Popup()
//           .setLngLat([facility.location.longitude, facility.location.latitude])
//           .setHTML(`
//             <div>
//               <h3>${facility.name || facility.type}</h3>
//               <p>Type: ${facility.type}</p>
//             </div>
//           `)
//           .addTo(map.current!);
//       });
//     });

//   }, [facilities, mapLoaded]);

//   if (!process.env.REACT_APP_MAPTILER_API_KEY && !maptilersdk.config.apiKey) {
//     return (
//       <div style={{ 
//         width: '100%', 
//         height: '100%', 
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center',
//         backgroundColor: '#f5f5f5'
//       }}>
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//           <h3>MapTiler API Key Required</h3>
//           <p>Please add REACT_APP_MAPTILER_API_KEY to your environment variables</p>
//         </div>
//       </div>
//     );
//   }
  

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//       <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
//       {loading && (
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           background: 'white',
//           padding: '15px 20px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           zIndex: 1000
//         }}>
//           Loading facilities...
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapView;