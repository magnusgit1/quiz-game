
import { createContext, useState, useEffect } from 'react';

// AuthContext used to allow all the components to check whether the user is logged in or not.
// Especially useful in the endpage-component, to ensure that only registered and logged in users can enter the leaderboard.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Retrieves the token representing the user from the sessionstorage.
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const logOut = async () => {

        // Logs the user out by deleting the token using the backend-api
        // The api takes in a token, checks its validity, and deletes if valid.

        const token = sessionStorage.getItem('token');
        console.log('Logging out with the token:', token);
        try{
            await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            // Removes the item from the storage, and sets the user to not be logged in with SetIsLoggedIn.

            sessionStorage.removeItem('token');
            setIsLoggedIn(false);
        } catch(error){
            console.error('Logout failed', error);
        }
    };

    const logIn = () =>{
        //Simple function which only sets the state-variable, since LogIn is already handled in the LogIn.jsx-component
        setIsLoggedIn(true);
    }

    return(
        <AuthContext.Provider value={{ isLoggedIn, logOut, logIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;