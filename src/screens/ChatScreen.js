import { Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../styles/colors';

function getStatusColor(status) {
  switch (status) {
    case 'connected':
      return COLORS.green;
    case 'connecting':
      return COLORS.orange;
    case 'available':
    default:
      return COLORS.gray;
  }
}

export default function ChatScreen({ route, navigation }) {
  const selectedUser = route?.params?.user;
  const chatLabel = selectedUser ? selectedUser.name || selectedUser.id : 'No user selected';
  const statusColor = selectedUser ? getStatusColor(selectedUser.status) : COLORS.gray;

  return (
    <View style={{ flex: 1, backgroundColor: commonStyles.screen.backgroundColor }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>Chat</Text>
        <Text style={commonStyles.topBarText}>{selectedUser ? 'Online' : 'Offline'}</Text>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, padding: 16 }}>
        {selectedUser ? (
          <>
            <Text style={commonStyles.subtitle}>Chat with {chatLabel}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: statusColor, marginRight: 8 }} />
              <Text style={[commonStyles.infoText, { fontSize: 14, marginBottom: 0 }]}>
                {selectedUser.id} • {selectedUser.status}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={commonStyles.subtitle}>Chat Screen</Text>
            <Text style={commonStyles.infoText}>Select a user from Nearby to start chatting</Text>
          </>
        )}
        
        {/* Chat Messages Placeholder */}
        <View style={[commonStyles.mapPlaceholder, { marginTop: 16, backgroundColor: COLORS.darkBg, borderColor: COLORS.white, borderWidth: 1 }]}>
          <Text style={[commonStyles.mapPlaceholderText, { color: COLORS.white }]}>
            {selectedUser ? `Messages with ${chatLabel} will appear here` : 'Messages will appear here'}
          </Text>
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
