import { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Adjust the import based on your firestore file structure
import { AccessibilityData } from '../types';

const useAccessibility = () => {
    const [accessibilityData, setAccessibilityData] = useState<AccessibilityData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = firestore.collection('accessibilityReports')
            .onSnapshot(snapshot => {
                const data: AccessibilityData[] = [];
                snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() } as AccessibilityData));
                setAccessibilityData(data);
                setLoading(false);
            }, err => {
                setError(err.message);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    return { accessibilityData, loading, error };
};

export default useAccessibility;