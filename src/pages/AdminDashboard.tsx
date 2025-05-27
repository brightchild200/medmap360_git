import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard: React.FC = () => {
    const [availabilityData, setAvailabilityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore.collection('availability').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAvailabilityData(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        await firestore.collection('availability').doc(id).delete();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b p-2">Type</th>
                        <th className="border-b p-2">Location</th>
                        <th className="border-b p-2">Valid Till</th>
                        <th className="border-b p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {availabilityData.map(item => (
                        <tr key={item.id}>
                            <td className="border-b p-2">{item.type}</td>
                            <td className="border-b p-2">{item.location}</td>
                            <td className="border-b p-2">{item.validTill}</td>
                            <td className="border-b p-2">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;