import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: null
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;