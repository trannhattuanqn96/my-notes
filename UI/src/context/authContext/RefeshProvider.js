import { createContext, useState } from "react";

export const RefeshContext = createContext({
    refesh: null,
    setRefesh:null
});

export const RefeshProvider = ({ children }) => {
    const [refesh, setRefesh] = useState(false);

    const value = {
        refesh,
        setRefesh,
    };

    return (
        <RefeshContext.Provider value={value}>{children}</RefeshContext.Provider>
    );
};

export default RefeshContext;
