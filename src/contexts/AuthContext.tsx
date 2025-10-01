import React, { useState, createContext, useContext } from 'react';
type UserRole = 'freelancer' | 'client';
type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};
// Mock users for demonstration
const mockUsers = [{
  id: '1',
  name: 'John Freelancer',
  email: 'john@example.com',
  password: 'password',
  role: 'freelancer' as UserRole
}, {
  id: '2',
  name: 'Jane Client',
  email: 'jane@example.com',
  password: 'password',
  role: 'client' as UserRole
}];
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API request
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.role === role);
        if (foundUser) {
          const {
            password,
            ...userWithoutPassword
          } = foundUser;
          setUser(userWithoutPassword as User);
          resolve(true);
        } else {
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API request
    return new Promise(resolve => {
      setTimeout(() => {
        const userExists = mockUsers.some(u => u.email === email);
        if (!userExists) {
          const newUser = {
            id: String(mockUsers.length + 1),
            name,
            email,
            password,
            role
          };
          mockUsers.push(newUser);
          const {
            password: _,
            ...userWithoutPassword
          } = newUser;
          setUser(userWithoutPassword as User);
          resolve(true);
        } else {
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };
  const logout = () => {
    setUser(null);
  };
  return <AuthContext.Provider value={{
    user,
    login,
    register,
    logout,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};