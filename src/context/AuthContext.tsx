import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  ward: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS = {
  'admin@wasteai.com': {
    _id: '1',
    name: 'Admin',
    email: 'admin@wasteai.com',
    ward: 'Connaught Place',
    password: 'admin123',
  },
  'saiyam@wasteai.com': {
    _id: '2',
    name: 'Saiyam',
    email: 'saiyam@wasteai.com',
    ward: 'Dwarka',
    password: 'saiyam123',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('wasteai_user');
    const savedToken = localStorage.getItem('token');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Ensure token is in localStorage
      if (!savedToken && parsedUser.token) {
        localStorage.setItem('token', parsedUser.token);
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData: any) => {
    const demoUser = DEMO_USERS[userData.email as keyof typeof DEMO_USERS];
    if (demoUser && demoUser.password === userData.password) {
      const user = {
        _id: demoUser._id,
        id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        ward: demoUser.ward,
        token: 'demo-token-' + demoUser._id,
      };
      localStorage.setItem('wasteai_user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      setUser(user);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: any) => {
    const user = {
      _id: Date.now().toString(),
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      ward: userData.ward,
      token: 'demo-token-' + Date.now(),
    };
    localStorage.setItem('wasteai_user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('wasteai_user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
