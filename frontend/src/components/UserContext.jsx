
import { createContext, useState } from 'react';

// UserContext for the username to be accessed by other component.
const UserContext = createContext();

export const UserProvider = ({ children }) =>{
    const [userName, setUserName] = useState('');

    return(
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;