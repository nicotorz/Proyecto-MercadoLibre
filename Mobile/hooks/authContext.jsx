import { createContext, useState, useEffect, } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../services/api'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

   

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
