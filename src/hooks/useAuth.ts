import { useEffect, useState } from 'react';
import { auth } from '../firebase/config'; // Adjust the import based on your Firebase config file
import { onAuthStateChanged, User } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};

export default useAuth;