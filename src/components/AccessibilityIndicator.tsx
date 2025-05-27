import React from 'react';

interface AccessibilityIndicatorProps {
    isAccessible: boolean;
    facilityName: string;
}

const AccessibilityIndicator: React.FC<AccessibilityIndicatorProps> = ({ isAccessible, facilityName }) => {
    return (
        <div className={`flex items-center ${isAccessible ? 'text-green-500' : 'text-red-500'}`}>
            <span className={`material-icons ${isAccessible ? 'text-green-500' : 'text-red-500'}`}>
                {isAccessible ? 'check_circle' : 'cancel'}
            </span>
            <span className="ml-2">
                {facilityName} is {isAccessible ? 'accessible' : 'not accessible'}
            </span>
        </div>
    );
};

export default AccessibilityIndicator;