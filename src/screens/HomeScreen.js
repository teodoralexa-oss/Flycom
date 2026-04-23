import { Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { COLORS } from '../styles/colors';
import { addReferencePoint, loadReferencePoints, addSOSAlert, loadSOSAlerts } from '../storage';

export default function HomeScreen({ navigation }) {
  const { user, isLoadingUser, setUsername, isOnline, connectionType } = useAppContext();
  const [usernameInput, setUsernameInput] = useState('');
  const [showAddPointMenu, setShowAddPointMenu] = useState(false);
  
  // Reference points state
  const [referencePoints, setReferencePoints] = useState([]);

  useEffect(() => {
    setUsernameInput(user?.username ?? '');
    loadReferencePoints().then(setReferencePoints);
  }, [user]);

  const goToChat = useCallback(() => navigation.navigate('Chat'), [navigation]);

  const displayName = useMemo(() => {
    if (!user) return '';
    return user.username || user.id;
  }, [user]);

  const handleAddReferencePoint = async (type, safetyLevel) => {
    const newPoint = {
      type,
      safetyLevel,
      latitude: user?.latitude || 51.508742,
      longitude: user?.longitude || -0.120850,
    };
    await addReferencePoint(newPoint);
    const updated = await loadReferencePoints();
    setReferencePoints(updated);
    setShowAddPointMenu(false);
    
    Alert.alert(
      'Point Added',
      `${type} marked with ${safetyLevel} safety level`,
      [{ text: 'OK' }]
    );
  };

  const handleSOS = async () => {
    Alert.alert(
      'SEND SOS ALERT?',
      'This will broadcast your location to all nearby users in the mesh network.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SEND SOS',
          style: 'destructive',
          onPress: async () => {
            const sosAlert = {
              userId: user?.id,
              username: displayName,
              latitude: user?.latitude || 51.508742,
              longitude: user?.longitude || -0.120850,
              message: 'USER NEEDS IMMEDIATE ASSISTANCE',
            };
            await addSOSAlert(sosAlert);
            
            Alert.alert(
              'SOS SENT!',
              'Your location has been broadcast to all nearby users. Help is on the way.',
              [{ text: 'OK' }]
            );
            
            // Notify all users (simulated - in real app this would use BLE)
            Alert.alert(
              'SYSTEM MESSAGE',
              `🚨 SOS ALERT from ${displayName} at ${user?.latitude?.toFixed(4)}, ${user?.longitude?.toFixed(4)}`,
              [{ text: 'ACKNOWLEDGE' }]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar - Moved down with marginTop */}
      <View style={[commonStyles.topBar, { marginTop: 10 }]}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={commonStyles.topBarText}>User: {displayName}</Text>
          <Text style={[commonStyles.topBarText, { fontSize: 12, marginTop: 4 }]}>
            Status: {isOnline ? 'Connected' : 'Mesh'} • {connectionType}
          </Text>
        </View>
      </View>

      {/* Main Content Area - Scrollable */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
      >
        {/* Map Section */}
        <View style={{ alignItems: 'center', paddingTop: 16 }}>
          <MapView 
            style={{
              width: '90%',
              height: 300,
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#e5e5e5',
            }}
            initialRegion={{
              latitude: user?.latitude || 51.508742,
              longitude: user?.longitude || -0.120850,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation
            followsUserLocation
            customMapStyle={[]}
          >
            {/* OpenStreetMap Tiles */}
            <UrlTile
              urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />
            
            <Marker
              coordinate={{
                latitude: user?.latitude || 51.508742,
                longitude: user?.longitude || -0.120850,
              }}
              title="You"
              description="Current location"
              pinColor={COLORS.primaryBlue}
            />
            {referencePoints.map((point) => (
              <Marker
                key={point.id}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                title={point.type}
                description={`Safety Level: ${point.safetyLevel}`}
                pinColor={point.safetyLevel === 'high' ? COLORS.green : point.safetyLevel === 'medium' ? COLORS.orange : COLORS.red}
              />
            ))}
          </MapView>

          {/* Add Point Button */}
          <TouchableOpacity 
            style={commonStyles.addPointButton}
            onPress={() => setShowAddPointMenu(!showAddPointMenu)}
          >
            <Ionicons name="add-circle" size={30} color={COLORS.white} />
          </TouchableOpacity>

          {/* Add Point Menu */}
          {showAddPointMenu && (
            <View style={commonStyles.addPointMenu}>
              <Text style={commonStyles.menuTitle}>Add Reference Point</Text>
              <TouchableOpacity 
                style={commonStyles.menuOption}
                onPress={() => handleAddReferencePoint('Shelter', 'high')}
              >
                <Ionicons name="home" size={20} color={COLORS.white} />
                <Text style={commonStyles.menuOptionText}>Shelter (High Safety)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={commonStyles.menuOption}
                onPress={() => handleAddReferencePoint('Safe Zone', 'medium')}
              >
                <Ionicons name="shield-checkmark" size={20} color={COLORS.white} />
                <Text style={commonStyles.menuOptionText}>Safe Zone (Medium Safety)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={commonStyles.menuOption}
                onPress={() => handleAddReferencePoint('Danger Zone', 'low')}
              >
                <Ionicons name="warning" size={20} color={COLORS.white} />
                <Text style={commonStyles.menuOptionText}>Danger Zone (Low Safety)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[commonStyles.menuOption, { backgroundColor: COLORS.darkBg }]}
                onPress={() => setShowAddPointMenu(false)}
              >
                <Text style={[commonStyles.menuOptionText, { color: COLORS.primaryBlue }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* SOS Button - Centered and Moved Up */}
        <View style={[commonStyles.sosContainer, { bottom: 120 }]}>
          <TouchableOpacity 
            style={commonStyles.sosButtonLarge} 
            onPress={handleSOS}
          >
            <Ionicons name="radio" size={40} color={COLORS.white} />
            <Text style={commonStyles.sosButtonTextLarge}>SOS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={commonStyles.bottomNav}>
        <TouchableOpacity style={commonStyles.navButton} onPress={goToChat}>
          <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => {}}>
          <Ionicons name="home" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
