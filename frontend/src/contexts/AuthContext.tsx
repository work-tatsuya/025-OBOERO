
import { createContext } from "react";


export type AuthContextType = {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

