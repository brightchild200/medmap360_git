import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { AccessibilityData } from '../types';

const useAccessibility = () => {
    const [accessibilityData, setAccessibilityData] = useState<AccessibilityData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const accessibilityCollection = collection(db, 'accessibilityReports');
        
        const unsubscribe = onSnapshot(
            accessibilityCollection,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as AccessibilityData[];
                setAccessibilityData(data);
                setLoading(false);
                setError(null);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching accessibility data:', err);
            }
        );

        return () => unsubscribe();
    }, []);

    return { accessibilityData, loading, error };
};

export default useAccessibility;

// import { useEffect, useState } from 'react';
// import { db } from '../firebase/config'; // Adjust the import based on your firestore file structure
// import { AccessibilityData } from '../types';

// const useAccessibility = () => {
//     const [accessibilityData, setAccessibilityData] = useState<AccessibilityData[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const unsubscribe = firestore.collection('accessibilityReports')
//             .onSnapshot(snapshot => {
//                 const data: AccessibilityData[] = [];
//                 snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() } as AccessibilityData));
//                 setAccessibilityData(data);
//                 setLoading(false);
//             }, err => {
//                 setError(err.message);
//                 setLoading(false);
//             });

//         return () => unsubscribe();
//     }, []);

//     return { accessibilityData, loading, error };
// };

// export default useAccessibility;