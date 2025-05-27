import React from 'react';

interface FacilityCardProps {
    name: string;
    type: 'hospital' | 'pharmacy' | 'clinic' | 'ambulance';
    address: string;
    availability: string;
    onClick: () => void;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ name, type, address, availability, onClick }) => {
    const getIcon = () => {
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
                return '';
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
            <img src={getIcon()} alt={type} className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600">{address}</p>
            <p className={`mt-2 ${availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                {availability}
            </p>
        </div>
    );
};

export default FacilityCard;