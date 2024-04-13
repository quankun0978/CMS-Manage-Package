import { createContext, useState } from 'react';

const AuthContext = createContext({});
export const AuProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
