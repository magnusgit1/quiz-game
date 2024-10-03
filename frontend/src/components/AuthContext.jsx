
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const logOut = async () => {
        const token = localStorage.getItem('token');
        console.log('Logging out with the token:', token);
        try{
            await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        } catch(error){
            console.error('Logout failed', error);
        }
    };

    const logIn = () =>{
        setIsLoggedIn(true);
    }

    return(
        <AuthContext.Provider value={{ isLoggedIn, logOut, logIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;