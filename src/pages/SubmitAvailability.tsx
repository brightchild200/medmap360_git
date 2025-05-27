import React, { useState } from 'react';
import { db } from '../firebase/config'; // Import Firestore logic
import { collection, addDoc } from 'firebase/firestore';

const SubmitAvailability: React.FC = () => {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [validTill, setValidTill] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await addDoc(collection(db, 'availability'), {
                type,
                location,
                validTill,
                timestamp: new Date(),
            });
            setType('');
            setLocation('');
            setValidTill('');
        } catch (err) {
            setError('Failed to submit availability. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Report Availability</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select Type</option>
                        <option value="Hospital Bed">Hospital Bed</option>
                        <option value="Oxygen Cylinder">Oxygen Cylinder</option>
                        <option value="Medicine">Medicine</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Valid Till</label>
                    <input
                        type="datetime-local"
                        value={validTill}
                        onChange={(e) => setValidTill(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default SubmitAvailability;