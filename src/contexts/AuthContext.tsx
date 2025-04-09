
import * as React from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Check if user is already logged in
  React.useEffect(() => {
    const storedUser = localStorage.getItem('reactorUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Hard-coded admin check
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          email: 'admin@gmail.com',
          name: 'Administrator',
          role: 'admin'
        };
        
        setUser(adminUser);
        localStorage.setItem('reactorUser', JSON.stringify(adminUser));
        toast.success("Admin login successful!");
        setIsLoading(false);
        return true;
      }
      
      // For demo purposes, other users (to be replaced with actual DB validation)
      if (email && password.length >= 6) {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: email,
          name: email.split('@')[0],
          role: 'operator'
        };
        
        setUser(newUser);
        localStorage.setItem('reactorUser', JSON.stringify(newUser));
        toast.success("Login successful!");
        setIsLoading(false);
        return true;
      }

      toast.error("Invalid credentials!");
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate registration
      if (email && password && password.length >= 6) {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: name || email.split('@')[0],
          role: 'operator'
        };
        
        setUser(newUser);
        localStorage.setItem('reactorUser', JSON.stringify(newUser));
        toast.success("Registration successful!");
        setIsLoading(false);
        return true;
      }
      
      toast.error("Invalid registration details!");
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('reactorUser');
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
