export const isAccessible = (facility: any): boolean => {
    return facility.accessibilityFeatures && facility.accessibilityFeatures.includes('wheelchair');
};

export const getAccessibilityIndicators = (facilities: any[]): any[] => {
    return facilities.map(facility => ({
        id: facility.id,
        name: facility.name,
        isAccessible: isAccessible(facility),
        accessibilityInfo: facility.accessibilityInfo || 'No additional information'
    }));
};

export const submitAccessibilityInfo = async (facilityId: string, accessibilityData: any): Promise<void> => {
    // Logic to submit accessibility information to Firestore
    // This function would typically interact with Firestore to save the data
};