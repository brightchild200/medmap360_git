import { LatLng } from 'leaflet';

export const getIconByType = (type: string) => {
    switch (type) {
        case 'hospital':
            return '/assets/icons/hospital.svg';
        case 'pharmacy':
            return '/assets/icons/pharmacy.svg';
        case 'clinic':
            return '/assets/icons/clinic.svg';
        case 'ambulance':
            return '/assets/icons/ambulance.svg';
        default:
            return '/assets/icons/default.svg';
    }
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

export const getAccessibleRoutes = (origin: LatLng, destination: LatLng) => {
    // Placeholder for function to fetch accessible routes
    // This could integrate with a routing API that supports accessibility data
    return [];
};