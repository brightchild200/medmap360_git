import React from 'react';
import MapView from '../components/MapView';


const Home: React.FC = () => {
    return (
        <div className="h-screen flex flex-col">
            {/* Header section */}
            <div className="flex flex-col items-center justify-center py-8 bg-white">
                <h1 className="text-3xl font-bold mb-2">Welcome to MedMap360</h1>
                <p className="text-lg">Locate nearby clinics, pharmacies, and hospitals in real-time.</p>
            </div>
            
            {/* Map section - takes remaining space */}
            <div className="flex-1">
                <MapView />
            </div>
        </div>
    );
};

export default Home;