import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;
  shopName?: string;
  slug?: string;
  phone?: string;
  address?: string;
  cardLastFour?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name: string) => void;
  logout: () => void;
  completeOnboarding: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('fastfactor_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      isOnboarded: false,
    };
    setUser(newUser);
    localStorage.setItem('fastfactor_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fastfactor_user');
  };

  const completeOnboarding = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data, isOnboarded: true };
      setUser(updatedUser);
      localStorage.setItem('fastfactor_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
