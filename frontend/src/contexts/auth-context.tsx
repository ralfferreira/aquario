"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Centro = {
  id: string;
  nome: string;
  sigla: string;
};

type Curso = {
  id: string;
  nome: string;
};

type User = {
  id: string;
  nome: string;
  email: string;
  papel: "DISCENTE" | "DOCENTE";
  papelPlataforma: "USER" | "MASTER_ADMIN";
  urlFotoPerfil?: string | null;
  centro: Centro;
  curso?: Curso | null;
  periodo?: number | null;
  bio?: string | null;
  permissoes: string[];
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:3001/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Falha ao buscar usuário:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
