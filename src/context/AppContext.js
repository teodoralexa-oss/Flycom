import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import { loadOrCreateUser, updateUsername as persistUsername } from '../services/userService';
import { generateNearbyUsers } from '../services/nearbyService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [nearbyError, setNearbyError] = useState('');

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

  const loadNearbyUsers = useCallback(async () => {
    setIsLoadingNearby(true);
    setNearbyError('');

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setNearbyError('Location permission denied.');
        setNearbyUsers([]);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = location.coords;
      setCurrentLocation(coords);
      setNearbyUsers(generateNearbyUsers(coords));
    } catch {
      setNearbyError('Could not fetch location.');
      setNearbyUsers([]);
    } finally {
      setIsLoadingNearby(false);
    }
  }, []);

  useEffect(() => {
    loadNearbyUsers();
  }, [loadNearbyUsers]);

  const value = useMemo(
    () => ({
      user,
      isLoadingUser,
      setUsername,
      currentLocation,
      nearbyUsers,
      isLoadingNearby,
      nearbyError,
      loadNearbyUsers,
    }),
    [user, isLoadingUser, setUsername, currentLocation, nearbyUsers, isLoadingNearby, nearbyError, loadNearbyUsers]
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
