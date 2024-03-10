import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: null,
    refesh: null,
    setRefesh:null
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [refesh, setRefesh] = useState(false);

    const value = {
        user,
        setUser,
        refesh,
        setRefesh,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
