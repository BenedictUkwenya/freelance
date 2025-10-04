// import React, { useState, createContext, useContext } from 'react';
// type UserRole = 'freelancer' | 'client';
// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
// };
// type AuthContextType = {
//   user: User | null;
//   login: (email: string, password: string, role: UserRole) => Promise<boolean>;
//   register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
//   logout: () => void;
//   isLoading: boolean;
// };
// // Mock users for demonstration
// const mockUsers = [{
//   id: '1',
//   name: 'John Freelancer',
//   email: 'john@example.com',
//   password: 'password',
//   role: 'freelancer' as UserRole
// }, {
//   id: '2',
//   name: 'Jane Client',
//   email: 'jane@example.com',
//   password: 'password',
//   role: 'client' as UserRole
// }];
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// export const AuthProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({
//   children
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
//     setIsLoading(true);
//     // Simulate API request
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.role === role);
//         if (foundUser) {
//           const {
//             password,
//             ...userWithoutPassword
//           } = foundUser;
//           setUser(userWithoutPassword as User);
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//         setIsLoading(false);
//       }, 1000);
//     });
//   };
//   const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
//     setIsLoading(true);
//     // Simulate API request
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const userExists = mockUsers.some(u => u.email === email);
//         if (!userExists) {
//           const newUser = {
//             id: String(mockUsers.length + 1),
//             name,
//             email,
//             password,
//             role
//           };
//           mockUsers.push(newUser);
//           const {
//             password: _,
//             ...userWithoutPassword
//           } = newUser;
//           setUser(userWithoutPassword as User);
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//         setIsLoading(false);
//       }, 1000);
//     });
//   };
//   const logout = () => {
//     setUser(null);
//   };
//   return <AuthContext.Provider value={{
//     user,
//     login,
//     register,
//     logout,
//     isLoading
//   }}>
//       {children}
//     </AuthContext.Provider>;
// };
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { useState, useEffect, createContext, useContext } from "react";

// Types
type UserRole = "freelancer" | "client";

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

// Mock users (for demo purposes only – replace with API later)
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    name: "John Freelancer",
    email: "john@example.com",
    password: "password",
    role: "freelancer",
  },
  {
    id: "2",
    name: "Jane Client",
    email: "jane@example.com",
    password: "password",
    role: "client",
  },
  {
    id: "3",
    name: "Valerie Onoja",
    email: "jovalyn.valerie@gmail.com",
    password: "password",
    role: "freelancer",
  },
];

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password && u.role === role
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          resolve(true);
        } else {
          resolve(false);
        }

        setIsLoading(false);
      }, 1000);
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = mockUsers.some((u) => u.email === email);

        if (!userExists) {
          const newUser = {
            id: String(mockUsers.length + 1),
            name,
            email,
            password,
            role,
          };
          mockUsers.push(newUser);

          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
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
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
