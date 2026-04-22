import { Text, TouchableOpacity, View, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';
import { useAppContext } from '../context/AppContext';

export default function SettingsScreen({ navigation }) {
  const { user, setUsername } = useAppContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState('Standard');

  const accessibilityOptions = ['Standard', 'Large Text', 'High Contrast'];
  const announcementOptions = ['All', 'Critical Only', 'None'];
  const [announcements, setAnnouncements] = useState('All');

  const cycleAccessibility = () => {
    const currentIndex = accessibilityOptions.indexOf(accessibilityMode);
    const nextIndex = (currentIndex + 1) % accessibilityOptions.length;
    setAccessibilityMode(accessibilityOptions[nextIndex]);
  };

  const cycleAnnouncements = () => {
    const currentIndex = announcementOptions.indexOf(announcements);
    const nextIndex = (currentIndex + 1) % announcementOptions.length;
    setAnnouncements(announcementOptions[nextIndex]);
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
            <Text style={commonStyles.listItemSub}>{accessibilityMode}</Text>
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
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
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
            value={locationSharing}
            onValueChange={setLocationSharing}
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
            value={darkMode}
            onValueChange={setDarkMode}
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
            <Text style={commonStyles.listItemSub}>{announcements}</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* Credits Section */}
        <View style={[commonStyles.listItem, { marginTop: 16, backgroundColor: COLORS.primaryBlue }]}>
          <Text style={[commonStyles.listItemTitle, { marginBottom: 12 }]}>Credits</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.white, paddingBottom: 8, marginBottom: 8 }}>
            <Text style={commonStyles.listItemSub}>Development Team</Text>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.white, paddingBottom: 8, marginBottom: 8 }}>
            <Text style={commonStyles.listItemSub}>Design Team</Text>
          </View>
          <View>
            <Text style={commonStyles.listItemSub}>Special Thanks</Text>
          </View>
        </View>
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
