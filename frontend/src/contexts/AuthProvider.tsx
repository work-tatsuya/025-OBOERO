import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [refresh, setRefresh] = useState<string | null>(() => localStorage.getItem("refresh"));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem("username"));

  const login = (token: string, refresh: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("username", username);
    setToken(token);
    setRefresh(refresh);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setToken(null);
    setRefresh(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, refresh, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
