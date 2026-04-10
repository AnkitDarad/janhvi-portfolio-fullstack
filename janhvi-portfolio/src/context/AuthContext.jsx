import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEnabled, setAuthEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { authEnabled: enabled } = await api.getConfig();
        setAuthEnabled(enabled);

        if (!enabled) {
          setCurrentUser({ displayName: 'Public' });
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      } catch {
        // If config fetch fails, default to auth enabled
      }

      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('currentUser');

      if (token && storedUser) {
        try {
          const { user } = await api.verifyToken();
          setCurrentUser(user);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
        }
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const { token, user } = await api.login(username, password);
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }, []);

  const value = useMemo(
    () => ({ currentUser, isAuthenticated, authEnabled, isLoading, login, logout }),
    [currentUser, isAuthenticated, authEnabled, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
