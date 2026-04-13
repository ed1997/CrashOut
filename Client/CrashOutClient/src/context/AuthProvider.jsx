import { useState } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}