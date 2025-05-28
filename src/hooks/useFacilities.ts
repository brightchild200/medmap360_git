import { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Adjust the import based on your firebase config path
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { Facility } from '../types'; // Make sure Facility type is defined properly

const useFacilities = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const facilitiesCollection = collection(db, 'facilities');
        
        const unsubscribe: Unsubscribe = onSnapshot(
            facilitiesCollection,
            (snapshot) => {
                const facilitiesData: Facility[] = [];
                snapshot.forEach(doc => {
                    facilitiesData.push({ id: doc.id, ...doc.data() } as Facility);
                });
                setFacilities(facilitiesData);
                setLoading(false);
            },
            (error) => {
                setError(error.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const filterFacilities = (type: string) => {
        return facilities.filter(facility => facility.type === type);
    };

    return { facilities, loading, error, filterFacilities };
};

export default useFacilities;

// import { useEffect, useState } from 'react';
// import { db } from '../firebase/config'; // Adjust the import based on your firebase config path
// import { Facility } from '../types'; // Make sure Facility type is defined properly

// const useFacilities = () => {
//     const [facilities, setFacilities] = useState<Facility[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const unsubscribe = db.collection('facilities')
//             .onSnapshot(snapshot => {
//                 const facilitiesData: Facility[] = [];
//                 snapshot.forEach(doc => {
//                     facilitiesData.push({ id: doc.id, ...doc.data() } as Facility);
//                 });
//                 setFacilities(facilitiesData);
//                 setLoading(false);
//             }, (error) => {
//                 setError(error.message);
//                 setLoading(false);
//             });

//         return () => unsubscribe();
//     }, []);

//     const filterFacilities = (type: string) => {
//         return facilities.filter(facility => facility.type === type);
//     };

//     return { facilities, loading, error, filterFacilities };
// };

// export default useFacilities;
