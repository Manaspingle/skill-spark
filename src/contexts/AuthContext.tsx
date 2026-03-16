import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  points: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const MOCK_USERS: (User & { password: string })[] = [
  { id: '1', name: 'Alex Chen', email: 'alex@test.com', password: 'password', role: 'student', points: 450, badges: ['gold', 'silver'] },
  { id: '2', name: 'Admin', email: 'admin@test.com', password: 'admin', role: 'admin', points: 0, badges: [] },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('nexus_user');
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('nexus_user', JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    const newUser: User = { id: Date.now().toString(), name, email, role: 'student', points: 0, badges: [] };
    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('nexus_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
