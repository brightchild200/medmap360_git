import React from 'react';

const Emergency: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Emergency Assistance</h1>
            <p className="text-lg mb-8">Quick access to nearest ambulances, hospitals, and emergency helplines.</p>
            <div className="flex flex-col space-y-4">
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                    Nearest Ambulance
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Nearest Hospital
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Emergency Helplines
                </button>
            </div>
        </div>
    );
};

export default Emergency;