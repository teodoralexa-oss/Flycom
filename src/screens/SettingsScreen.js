import { Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>Settings</Text>
        <Text style={commonStyles.topBarText}>v1.0.0</Text>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={commonStyles.subtitle}>Settings</Text>
        
        {/* Settings Options Placeholder */}
        <View style={[commonStyles.listItem, { marginTop: 16 }]}>
          <Text style={commonStyles.listItemTitle}>Account</Text>
          <Text style={commonStyles.listItemSub}>Manage your account settings</Text>
        </View>
        
        <View style={[commonStyles.listItem, { marginTop: 8 }]}>
          <Text style={commonStyles.listItemTitle}>Notifications</Text>
          <Text style={commonStyles.listItemSub}>Configure notification preferences</Text>
        </View>
        
        <View style={[commonStyles.listItem, { marginTop: 8 }]}>
          <Text style={commonStyles.listItemTitle}>Privacy</Text>
          <Text style={commonStyles.listItemSub}>Privacy and security settings</Text>
        </View>
        
        <View style={[commonStyles.listItem, { marginTop: 8 }]}>
          <Text style={commonStyles.listItemTitle}>About</Text>
          <Text style={commonStyles.listItemSub}>App version and information</Text>
        </View>
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
