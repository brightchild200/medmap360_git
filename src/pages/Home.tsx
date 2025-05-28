import React from 'react';
import MapView from '../components/MapView';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to MedMap360</h1>
            <p className="text-lg mb-8">Locate nearby clinics, pharmacies, and hospitals in real-time.</p>
            <div className="w-full max-w-4xl">
            <MapView />
            </div>
        </div>
    );
};

export default Home;