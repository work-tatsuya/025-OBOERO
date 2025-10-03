import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  refresh: string | null;
  username: string | null;
  login: (token: string, refresh: string, username: string,) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  refresh: null,
  username: null,
  login: () => { },
  logout: () => { },
});
