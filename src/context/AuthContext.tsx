import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  adminLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('canteen_user');
    const savedAdmin = localStorage.getItem('canteen_admin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      if (email === 'user@canteen.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'John Doe',
          email: 'user@canteen.com',
          phone: '+1234567890'
        };
        setUser(userData);
        localStorage.setItem('canteen_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock admin login - replace with actual API call
      if (email === 'admin@canteen.com' && password === 'admin') {
        const adminData = {
          id: '1',
          name: 'Admin User',
          email: 'admin@canteen.com'
        };
        setAdmin(adminData);
        localStorage.setItem('canteen_admin', JSON.stringify(adminData));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('canteen_user');
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('canteen_admin');
  };

  const value = {
    user,
    admin,
    isLoading,
    login,
    adminLogin,
    logout,
    adminLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};