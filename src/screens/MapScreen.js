import { useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';
import { useAppContext } from '../context/AppContext';

export default function MapScreen({ navigation }) {
  const { currentLocation, nearbyUsers, isLoadingNearby, nearbyError, loadNearbyUsers } = useAppContext();

  useEffect(() => {
    if (!currentLocation && !isLoadingNearby) {
      loadNearbyUsers();
    }
  }, [currentLocation, isLoadingNearby, loadNearbyUsers]);

  const region = useMemo(() => {
    if (!currentLocation) return null;
    return {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [currentLocation]);

  if (isLoadingNearby) {
    return (
      <View style={commonStyles.screen}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text style={styles.statusText}>Getting your location...</Text>
      </View>
    );
  }

  if (nearbyError || !region) {
    return (
      <View style={commonStyles.screen}>
        <Text style={styles.statusText}>{nearbyError || 'Location unavailable.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="You"
          description="Current location"
        />
        {nearbyUsers.map((nearbyUser) => (
          <Marker
            key={nearbyUser.id}
            coordinate={{
              latitude: nearbyUser.latitude,
              longitude: nearbyUser.longitude,
            }}
            title={nearbyUser.name || nearbyUser.id}
            description={nearbyUser.id}
            onPress={() => navigation.navigate('Chat', { user: nearbyUser })}
          />
        ))}
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
