import { createContext, useState } from "react";

export const AuthContext = createContext({
    refesh: null,
    setRefesh:null,
    user:null,
    setUser:null
});

export const AuthProvider = ({ children }) => {
    const [refesh, setRefesh] = useState(false);
    const [user, setUser] = useState(null);
    const value = {
        refesh,
        setRefesh,
        user,
        setUser
    };
    
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
