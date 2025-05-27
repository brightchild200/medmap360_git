export interface Facility {
    id: string;
    name: string;
    type: 'hospital' | 'pharmacy' | 'clinic' | 'ambulance';
    location: {
        latitude: number;
        longitude: number;
    };
    accessibility: boolean;
    availableBeds?: number;
    availableOxygen?: number;
    availableMedicines?: string[];
}

export interface AvailabilityReport {
    id: string;
    facilityId: string;
    type: 'bed' | 'oxygen' | 'medicine';
    location: {
        latitude: number;
        longitude: number;
    };
    validTill: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}