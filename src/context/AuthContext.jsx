import { createContext, useState } from "react";
import { mockAuth } from "../mocks/mockAuth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const data = await mockAuth.login(email, password);
    setUser(data.user);
  };

  const register = async (form) => {
    const data = await mockAuth.register(form);
    setUser(data.user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
