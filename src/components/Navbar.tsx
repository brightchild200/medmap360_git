// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//     return (
//         <nav className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 shadow-md">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="text-white text-2xl font-bold tracking-wide">MedMap360</div>
//                 <div className="space-x-6 text-white font-medium">
//                     <Link to="/" className="hover:text-gray-200 transition">Home</Link>
//                     <Link to="/emergency" className="hover:text-gray-200 transition">Emergency</Link>
//                     <Link to="/submit-availability" className="hover:text-gray-200 transition">Submit Availability</Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


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