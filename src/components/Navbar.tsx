import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">MedMap360</div>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-blue-200">Home</Link>
                    <Link to="/emergency" className="text-white hover:text-blue-200">Emergency</Link>
                    <Link to="/submit-availability" className="text-white hover:text-blue-200">Submit Availability</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;