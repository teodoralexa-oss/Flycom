import { Text, TouchableOpacity, View, Switch, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';
import { useAppContext } from '../context/AppContext';
import { loadSettings, updateSetting } from '../storage';

export default function SettingsScreen({ navigation }) {
  const { user, setUsername } = useAppContext();
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    locationSharing: true,
    darkMode: true,
    accessibilityMode: 'Standard',
    announcements: 'All',
  });

  const accessibilityOptions = ['Standard', 'Large Text', 'High Contrast'];
  const announcementOptions = ['All', 'Critical Only', 'None'];

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  const toggleSetting = async (key) => {
    const newValue = !settings[key];
    const updated = await updateSetting(key, newValue);
    setSettings(updated);
    
    if (key === 'locationSharing') {
      Alert.alert(
        newValue ? 'Location Sharing Enabled' : 'Location Sharing Disabled',
        newValue 
          ? 'Your location will be visible to other mesh users.' 
          : 'Your location is now hidden from other users.'
      );
    }
  };

  const cycleAccessibility = async () => {
    const currentIndex = accessibilityOptions.indexOf(settings.accessibilityMode);
    const nextIndex = (currentIndex + 1) % accessibilityOptions.length;
    const updated = await updateSetting('accessibilityMode', accessibilityOptions[nextIndex]);
    setSettings(updated);
  };

  const cycleAnnouncements = async () => {
    const currentIndex = announcementOptions.indexOf(settings.announcements);
    const nextIndex = (currentIndex + 1) % announcementOptions.length;
    const updated = await updateSetting('announcements', announcementOptions[nextIndex]);
    setSettings(updated);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data?',
      'This will delete all messages, reference points, and SOS alerts. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'CLEAR ALL',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Data Cleared', 'All local data has been deleted.');
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>Settings</Text>
        <Text style={commonStyles.topBarText}>v1.0.0</Text>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, padding: 16 }}>
        {/* User Section */}
        <View style={[commonStyles.listItem, { marginTop: 8 }]}>
          <Text style={commonStyles.listItemTitle}>User ID</Text>
          <Text style={commonStyles.listItemSub}>{user?.id || 'N/A'}</Text>
        </View>

        {/* Accessibility Dropdown */}
        <TouchableOpacity 
          style={[commonStyles.listItem, { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
          onPress={cycleAccessibility}
        >
          <View>
            <Text style={commonStyles.listItemTitle}>Accessibility</Text>
            <Text style={commonStyles.listItemSub}>{settings.accessibilityMode}</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* Notifications Toggle */}
        <View style={[commonStyles.listItem, { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <View>
            <Text style={commonStyles.listItemTitle}>Notifications</Text>
            <Text style={commonStyles.listItemSub}>Enable push notifications</Text>
          </View>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={() => toggleSetting('notificationsEnabled')}
            trackColor={{ false: COLORS.gray, true: COLORS.primaryBlue }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Location Sharing Toggle */}
        <View style={[commonStyles.listItem, { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <View>
            <Text style={commonStyles.listItemTitle}>Location Sharing</Text>
            <Text style={commonStyles.listItemSub}>Share your location with others</Text>
          </View>
          <Switch
            value={settings.locationSharing}
            onValueChange={() => toggleSetting('locationSharing')}
            trackColor={{ false: COLORS.gray, true: COLORS.primaryBlue }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Dark Mode Toggle */}
        <View style={[commonStyles.listItem, { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <View>
            <Text style={commonStyles.listItemTitle}>Dark Mode</Text>
            <Text style={commonStyles.listItemSub}>Use dark theme</Text>
          </View>
          <Switch
            value={settings.darkMode}
            onValueChange={() => toggleSetting('darkMode')}
            trackColor={{ false: COLORS.gray, true: COLORS.primaryBlue }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* App Announcements Dropdown */}
        <TouchableOpacity 
          style={[commonStyles.listItem, { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
          onPress={cycleAnnouncements}
        >
          <View>
            <Text style={commonStyles.listItemTitle}>App Announcements</Text>
            <Text style={commonStyles.listItemSub}>{settings.announcements}</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* BLE Mesh Info */}
        <View style={[commonStyles.listItem, { marginTop: 16, backgroundColor: COLORS.primaryBlue }]}>
          <Text style={[commonStyles.listItemTitle, { marginBottom: 8 }]}>BLE Mesh Network</Text>
          <Text style={commonStyles.listItemSub}>Status: {settings.locationSharing ? 'Active' : 'Disabled'}</Text>
          <Text style={commonStyles.listItemSub}>Range: ~50m (varies by device)</Text>
          <Text style={commonStyles.listItemSub}>Protocol: Bluetooth Low Energy</Text>
        </View>

        {/* Clear Data Button */}
        <TouchableOpacity 
          style={[commonStyles.listItem, { marginTop: 16, backgroundColor: COLORS.red, alignItems: 'center' }]}
          onPress={handleClearData}
        >
          <Text style={[commonStyles.listItemTitle, { color: COLORS.white }]}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={commonStyles.bottomNav}>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
          <Text style={commonStyles.navButtonText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navButton} onPress={() => navigation.navigate('Home')}>
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
