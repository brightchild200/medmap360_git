import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  Unsubscribe,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

const availabilityCollection = collection(db, 'availabilityReports');

export interface Availability {
  facilityId: string;
  type: 'bed' | 'oxygen' | 'medicine';
  location: {
    latitude: number;
    longitude: number;
  };
  validTill: Date;
  timestamp?: Timestamp | Date;
}

export const submitAvailability = async (data: Omit<Availability, 'timestamp'>): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(availabilityCollection, {
      ...data,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    return undefined;
  }
};

export const fetchAvailability = async (): Promise<(Availability & { id: string })[]> => {
  try {
    const snapshot = await getDocs(availabilityCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (Availability & { id: string })[];
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};

export const subscribeToAvailability = (
  callback: (data: (Availability & { id: string })[]) => void
): Unsubscribe => {
  return onSnapshot(availabilityCollection, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (Availability & { id: string })[];
    callback(data);
  }, (error) => {
    console.error("Error in real-time listener:", error);
  });
};



// import { db } from './config';
// import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

// const availabilityCollection = collection(db, 'availability');

// export const submitAvailability = async (data) => {
//     try {
//         const docRef = await addDoc(availabilityCollection, data);
//         return docRef.id;
//     } catch (error) {
//         console.error("Error adding document: ", error);
//     }
// };

// export const fetchAvailability = async () => {
//     const snapshot = await getDocs(availabilityCollection);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };

// export const subscribeToAvailability = (callback) => {
//     return onSnapshot(availabilityCollection, (snapshot) => {
//         const availabilityData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         callback(availabilityData);
//     });
// };

// import { db } from './config';
// import {
//   collection as firestoreCollection,
//   addDoc,
//   getDocs,
//   onSnapshot,
//   Unsubscribe,
// } from 'firebase/firestore';

// const availabilityCollection = firestoreCollection(db, 'availability');

// export interface Availability {
//   type: string;
//   name: string;
//   location: string;
//   timestamp?: Date;
// }

// export const submitAvailability = async (data: Availability): Promise<string | undefined> => {
//   try {
//     const docRef = await addDoc(availabilityCollection, data);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding document:", error);
//     return undefined;
//   }
// };

// export const fetchAvailability = async (): Promise<(Availability & { id: string })[]> => {
//   const snapshot = await getDocs(availabilityCollection);
//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as (Availability & { id: string })[];
// };

// export const subscribeToAvailability = (
//   callback: (data: (Availability & { id: string })[]) => void
// ): Unsubscribe => {
//   return onSnapshot(availabilityCollection, (snapshot) => {
//     const data = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as (Availability & { id: string })[];
//     callback(data);
//   });
// };
