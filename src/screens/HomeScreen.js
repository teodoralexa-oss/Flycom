import { Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { COLORS } from '../styles/colors';

export default function HomeScreen({ navigation }) {
  const { user, isLoadingUser, setUsername, isOnline, connectionType } = useAppContext();
  const [usernameInput, setUsernameInput] = useState('');
  const [showAddPointMenu, setShowAddPointMenu] = useState(false);
  
  // Reference points state
  const [referencePoints, setReferencePoints] = useState([]);

  useEffect(() => {
    setUsernameInput(user?.username ?? '');
  }, [user]);

  const goToChat = useCallback(() => navigation.navigate('Chat'), [navigation]);

  const displayName = useMemo(() => {
    if (!user) return '';
    return user.username || user.id;
  }, [user]);

  const addReferencePoint = (type, safetyLevel) => {
    const newPoint = {
      id: Date.now().toString(),
      type,
      safetyLevel,
      latitude: user?.latitude || 51.508742,
      longitude: user?.longitude || -0.120850,
    };
    setReferencePoints([...referencePoints, newPoint]);
    setShowAddPointMenu(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={commonStyles.topBarText}>User: {displayName}</Text>
          <Text style={[commonStyles.topBarText, { fontSize: 12, marginTop: 4 }]}>
            Status: {isOnline ? 'Connected' : 'Mesh'} • {connectionType}
          </Text>
        </View>
      </View>

      {/* Main Content Area - Map */}
      <View style={{ flex: 1 }}>
        <MapView 
          style={commonStyles.mapContainer}
          showsUserLocation
          followsUserLocation
        >
          <Marker
            coordinate={{
              latitude: user?.latitude || 51.508742,
              longitude: user?.longitude || -0.120850,
            }}
            title="You"
            description="Current location"
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
              onPress={() => addReferencePoint('Shelter', 'high')}
            >
              <Ionicons name="home" size={20} color={COLORS.white} />
              <Text style={commonStyles.menuOptionText}>Shelter (High Safety)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={commonStyles.menuOption}
              onPress={() => addReferencePoint('Safe Zone', 'medium')}
            >
              <Ionicons name="shield-checkmark" size={20} color={COLORS.white} />
              <Text style={commonStyles.menuOptionText}>Safe Zone (Medium Safety)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={commonStyles.menuOption}
              onPress={() => addReferencePoint('Danger Zone', 'low')}
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

      {/* SOS Button - Centered and Larger */}
      <View style={commonStyles.sosContainer}>
        <TouchableOpacity 
          style={commonStyles.sosButtonLarge} 
          onPress={() => {}}
        >
          <Ionicons name="radio" size={40} color={COLORS.white} />
          <Text style={commonStyles.sosButtonTextLarge}>SOS</Text>
        </TouchableOpacity>
      </View>

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
