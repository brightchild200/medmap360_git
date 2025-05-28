import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, doc, deleteDoc, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { AvailabilityReport, AccessibilityData } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import useAccessibility from '../hooks/useAccessibility';

const AdminDashboard: React.FC = () => {
    const [availabilityData, setAvailabilityData] = useState<AvailabilityReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'availability' | 'accessibility'>('availability');
    
    // Use the accessibility hook
    const { accessibilityData, loading: accessibilityLoading, error: accessibilityError } = useAccessibility();

    useEffect(() => {
        const availabilityCollection = collection(db, 'availabilityReports');
        
        const unsubscribe = onSnapshot(
            availabilityCollection,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const data = snapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data() 
                })) as AvailabilityReport[];
                setAvailabilityData(data);
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching availability data:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleDeleteAvailability = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'availabilityReports', id));
        } catch (error) {
            console.error('Error deleting availability document:', error);
            alert('Error deleting record. Please try again.');
        }
    };

    const handleDeleteAccessibility = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'accessibilityReports', id));
        } catch (error) {
            console.error('Error deleting accessibility document:', error);
            alert('Error deleting record. Please try again.');
        }
    };

    const formatDate = (date: Date | string) => {
        if (date instanceof Date) {
            return date.toLocaleDateString();
        }
        return new Date(date).toLocaleDateString();
    };

    const renderAccessibilityFeatures = (features: any) => {
        const activeFeatures = Object.entries(features)
            .filter(([key, value]) => value === true)
            .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase());
        
        return activeFeatures.length > 0 ? activeFeatures.join(', ') : 'None specified';
    };

    if (loading || accessibilityLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Tab Navigation */}
            <div className="mb-6">
                <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('availability')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                            activeTab === 'availability'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Availability Reports ({availabilityData.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('accessibility')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                            activeTab === 'accessibility'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Accessibility Reports ({accessibilityData.length})
                    </button>
                </nav>
            </div>

            {/* Error Display */}
            {accessibilityError && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    Error loading accessibility data: {accessibilityError}
                </div>
            )}

            {/* Availability Reports Tab */}
            {activeTab === 'availability' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Availability Reports</h2>
                    {availabilityData.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No availability reports found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border-b p-3 text-left">Facility ID</th>
                                        <th className="border-b p-3 text-left">Type</th>
                                        <th className="border-b p-3 text-left">Location</th>
                                        <th className="border-b p-3 text-left">Status</th>
                                        <th className="border-b p-3 text-left">Valid Till</th>
                                        <th className="border-b p-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availabilityData.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="border-b p-3">{item.facilityId}</td>
                                            <td className="border-b p-3 capitalize">{item.type}</td>
                                            <td className="border-b p-3">
                                                {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
                                            </td>
                                            <td className="border-b p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.status === 'available' ? 'bg-green-100 text-green-800' :
                                                    item.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                                    item.status === 'closed' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {item.status || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="border-b p-3">
                                                {formatDate(item.validTill)}
                                            </td>
                                            <td className="border-b p-3 text-center">
                                                <button
                                                    onClick={() => handleDeleteAvailability(item.id)}
                                                    className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Accessibility Reports Tab */}
            {activeTab === 'accessibility' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Accessibility Reports</h2>
                    {accessibilityData.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No accessibility reports found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border-b p-3 text-left">Facility ID</th>
                                        <th className="border-b p-3 text-left">Type</th>
                                        <th className="border-b p-3 text-left">Location</th>
                                        <th className="border-b p-3 text-left">Accessibility Features</th>
                                        <th className="border-b p-3 text-left">Valid Till</th>
                                        <th className="border-b p-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accessibilityData.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="border-b p-3">{item.facilityId}</td>
                                            <td className="border-b p-3 capitalize">{item.type}</td>
                                            <td className="border-b p-3">
                                                {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
                                            </td>
                                            <td className="border-b p-3 max-w-xs">
                                                <div className="text-sm">
                                                    {renderAccessibilityFeatures(item.accessibilityFeatures)}
                                                </div>
                                            </td>
                                            <td className="border-b p-3">
                                                {formatDate(item.validTill)}
                                            </td>
                                            <td className="border-b p-3 text-center">
                                                <button
                                                    onClick={() => handleDeleteAccessibility(item.id)}
                                                    className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;


// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase/config';
// import { collection, onSnapshot, doc, deleteDoc, QuerySnapshot, DocumentData } from 'firebase/firestore';
// import { AvailabilityReport } from '../types';
// import LoadingSpinner from '../components/LoadingSpinner';

// const AdminDashboard: React.FC = () => {
//     const [availabilityData, setAvailabilityData] = useState<AvailabilityReport[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const availabilityCollection = collection(db, 'availabilityReports');
        
//         const unsubscribe = onSnapshot(
//             availabilityCollection,
//             (snapshot: QuerySnapshot<DocumentData>) => {
//                 const data = snapshot.docs.map(doc => ({ 
//                     id: doc.id, 
//                     ...doc.data() 
//                 })) as AvailabilityReport[];
//                 setAvailabilityData(data);
//                 setLoading(false);
//             },
//             (error) => {
//                 console.error('Error fetching availability data:', error);
//                 setLoading(false);
//             }
//         );

//         return () => unsubscribe();
//     }, []);

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteDoc(doc(db, 'availabilityReports', id));
//         } catch (error) {
//             console.error('Error deleting document:', error);
//             alert('Error deleting record. Please try again.');
//         }
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//             {availabilityData.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                     No availability reports found.
//                 </div>
//             ) : (
//                 <table className="min-w-full bg-white border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="border-b p-2">Facility ID</th>
//                             <th className="border-b p-2">Type</th>
//                             <th className="border-b p-2">Location</th>
//                             <th className="border-b p-2">Valid Till</th>
//                             <th className="border-b p-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {availabilityData.map(item => (
//                             <tr key={item.id}>
//                                 <td className="border-b p-2">{item.facilityId}</td>
//                                 <td className="border-b p-2 capitalize">{item.type}</td>
//                                 <td className="border-b p-2">
//                                     {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
//                                 </td>
//                                 <td className="border-b p-2">
//                                     {item.validTill instanceof Date 
//                                         ? item.validTill.toLocaleDateString() 
//                                         : new Date(item.validTill).toLocaleDateString()
//                                     }
//                                 </td>
//                                 <td className="border-b p-2">
//                                     <button
//                                         onClick={() => handleDelete(item.id)}
//                                         className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:bg-red-50"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;