import { createContext, useContext, useEffect, useState } from "react";


import { api, createSession } from "../services/api";

export interface UserProps {
  id: string;
  name: string;
  email: string;

}

interface AuthContextType {
  user: UserProps | undefined;
  authenticated: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => void;
}

interface AuthContextProviderProps {
  children: JSX.Element
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [loading, setLoading] = useState(true);

  async function loadUserStorageData() {
    const storage = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storage && token) {

      const data = JSON.parse(storage) as UserProps;
      //Guarda o token
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await loadUserStorageData();
    })();
  }, []);

  async function signIn(username: string, password: string) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    try {
      const { data } = await createSession(username, password);
      const loggedUser = data.user;
      const token = data.token;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      await loadUserStorageData();

      window.location.href = '/';
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("signWithEmailPass");

    setUser({} as UserProps);
    setLoading(false);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user.id, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}