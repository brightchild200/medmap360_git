// src/types/index.ts

export interface Location {
    latitude: number;
    longitude: number;
}

export interface Facility {
    id: string;
    name: string;
    type: 'hospital' | 'pharmacy' | 'clinic' | 'ambulance';
    location: Location;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    operatingHours?: {
        [key: string]: string; // e.g., "monday": "9:00 AM - 5:00 PM"
    };
    services?: string[];
    emergency?: boolean;
    verified?: boolean;
    rating?: number;
    lastUpdated?: Date | string;
}

export interface AvailabilityReport {
    id: string;
    facilityId: string;
    type: 'hospital' | 'pharmacy' | 'clinic' | 'ambulance';
    location: Location;
    validTill: Date | string;
    timestamp?: Date | string;
    reportedBy?: string;
    status?: 'available' | 'busy' | 'closed';
    additionalInfo?: string;
}

export interface AccessibilityData {
    id: string;
    facilityId: string;
    type: 'hospital' | 'pharmacy' | 'clinic' | 'ambulance';
    location: Location;
    accessibilityFeatures: {
        wheelchairAccessible: boolean;
        hasElevator: boolean;
        hasRamps: boolean;
        accessibleParking: boolean;
        accessibleRestrooms: boolean;
        signLanguageSupport: boolean;
        brailleSignage: boolean;
    };
    validTill: Date | string;
    timestamp?: Date | string;
    reportedBy?: string;
    additionalInfo?: string;
}