"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  _id?: string;
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;

  token: string | null;

  loading: boolean;

  login: (data: any) => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedToken =
      localStorage.getItem(
        "token"
      );

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedToken) {
      setToken(storedToken);
    }

    if (
      storedUser 
    ) {
      try {
        setUser(
          JSON.parse(storedUser)
        );
      } catch (error) {
        console.log(
          "Invalid user data"
        );

        localStorage.removeItem(
          "user"
        );
      }
    }

    setLoading(false);
  }, []);

    const login = (data: any) => {
    const user = {
      _id: data.id,
      name: data.name,
      email: data.email,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(data.token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};