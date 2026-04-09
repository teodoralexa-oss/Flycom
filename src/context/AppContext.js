import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadOrCreateUser, updateUsername as persistUsername } from '../services/userService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeUser = async () => {
      try {
        const loadedUser = await loadOrCreateUser();
        if (isMounted) {
          setUser(loadedUser);
        }
      } finally {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      }
    };

    initializeUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const setUsername = useCallback(async (nextUsername) => {
    const updatedUser = await persistUsername(nextUsername);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoadingUser,
      setUsername,
    }),
    [user, isLoadingUser, setUsername]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
