import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import NavButton from '../components/NavButton';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { user, isLoadingUser, setUsername } = useAppContext();
  const [usernameInput, setUsernameInput] = useState('');

  useEffect(() => {
    setUsernameInput(user?.username ?? '');
  }, [user]);

  const goToMap = useCallback(() => navigation.navigate('Map'), [navigation]);
  const goToNearby = useCallback(() => navigation.navigate('Nearby'), [navigation]);
  const goToChat = useCallback(() => navigation.navigate('Chat'), [navigation]);
  const saveUsername = useCallback(async () => {
    await setUsername(usernameInput);
  }, [setUsername, usernameInput]);

  const displayName = useMemo(() => {
    if (!user) return '';
    return user.username || user.id;
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: commonStyles.screen.backgroundColor }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>User: {displayName}</Text>
        <Text style={commonStyles.topBarText}>ID: {user?.id || 'N/A'}</Text>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        {/* Map Placeholder */}
        <View style={commonStyles.mapPlaceholder}>
          <Text style={commonStyles.mapPlaceholderText}>Map View</Text>
        </View>

        {/* Consulates Section */}
        <View style={commonStyles.sectionContainer}>
          <Text style={commonStyles.sectionTitle}>Consulates</Text>
          <Text style={commonStyles.infoText}>No consulates nearby</Text>
        </View>

        {/* Embassies Section */}
        <View style={commonStyles.sectionContainer}>
          <Text style={commonStyles.sectionTitle}>Embassies</Text>
          <Text style={commonStyles.infoText}>No embassies nearby</Text>
        </View>
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
        <TouchableOpacity style={commonStyles.navButton} onPress={goToChat}>
          <Text style={{ fontSize: 20 }}>💬</Text>
          <Text style={commonStyles.navButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => {}}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <Text style={commonStyles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => {}}>
          <Text style={{ fontSize: 20 }}>⚙️</Text>
          <Text style={commonStyles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
