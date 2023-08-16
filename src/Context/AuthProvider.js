import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { createContext, useEffect, useState } from 'react';
import { Spin } from 'antd';

export const AuthContext = createContext();
    
function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL })
                setIsLoading(false);
                navigate('/room');
                return;
            }
            setIsLoading(false);
            navigate('/login');
        })

        //clean function
        return () => {
            unsubscribe()
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;