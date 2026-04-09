import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';

export default function MapScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          if (isMounted) {
            setErrorMessage('Location permission denied.');
          }
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (isMounted) {
          setCoords(location.coords);
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Could not fetch location.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getCurrentLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const region = useMemo(() => {
    if (!coords) return null;
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [coords]);

  if (isLoading) {
    return (
      <View style={commonStyles.screen}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text style={styles.statusText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMessage || !region) {
    return (
      <View style={commonStyles.screen}>
        <Text style={styles.statusText}>{errorMessage || 'Location unavailable.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="You"
          description="Current location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  map: {
    flex: 1,
  },
  statusText: {
    marginTop: 12,
    color: COLORS.black,
    fontSize: 16,
  },
});
