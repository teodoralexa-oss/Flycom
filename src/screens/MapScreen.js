import { useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <View style={[commonStyles.screen, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
        <Text style={[styles.statusText, { color: COLORS.white }]}>Getting your location...</Text>
      </View>
    );
  }

  if (nearbyError || !region) {
    return (
      <View style={[commonStyles.screen, { justifyContent: 'center' }]}>
        <Text style={[styles.statusText, { color: COLORS.white }]}>{nearbyError || 'Location unavailable.'}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>Map View</Text>
        <Text style={commonStyles.topBarText}>{nearbyUsers.length} nearby</Text>
      </View>

      {/* Map */}
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

      {/* Floating Buttons (SOS, Call Drone) */}
      <View style={commonStyles.floatingButtons}>
        <TouchableOpacity style={commonStyles.callDroneButton} onPress={() => {}}>
          <Text style={commonStyles.callDroneButtonText}>Call Drone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.sosButton} onPress={() => {}}>
          <Text style={commonStyles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={commonStyles.bottomNav}>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Chat')}>
          <Text style={{ fontSize: 20 }}>💬</Text>
          <Text style={commonStyles.navButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <Text style={commonStyles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={{ fontSize: 20 }}>⚙️</Text>
          <Text style={commonStyles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  statusText: {
    marginTop: 12,
    color: COLORS.white,
    fontSize: 16,
  },
});
