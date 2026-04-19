import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
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

export default function NearbyScreen({ navigation }) {
  const { nearbyUsers, isLoadingNearby, nearbyError, loadNearbyUsers } = useAppContext();

  useEffect(() => {
    if (nearbyUsers.length === 0 && !isLoadingNearby && !nearbyError) {
      loadNearbyUsers();
    }
  }, [nearbyUsers, isLoadingNearby, nearbyError, loadNearbyUsers]);

  if (isLoadingNearby) {
    return (
      <View style={[commonStyles.screen, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
        <Text style={[commonStyles.infoText, { color: COLORS.white }]}>Loading nearby users...</Text>
      </View>
    );
  }

  if (nearbyError) {
    return (
      <View style={[commonStyles.screen, { justifyContent: 'center' }]}>
        <Text style={[commonStyles.infoText, { color: COLORS.white }]}>{nearbyError}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.darkBg }}>
      {/* Top Info Bar */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.topBarText}>Nearby Users</Text>
        <Text style={commonStyles.topBarText}>{nearbyUsers.length} found</Text>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={commonStyles.subtitle}>Consulates & Embassies</Text>
        
        {/* Consulates Section */}
        <View style={commonStyles.sectionContainer}>
          <Text style={commonStyles.sectionTitle}>Consulates</Text>
          {nearbyUsers.map((nearbyUser) => {
            const statusColor = getStatusColor(nearbyUser.status);
            return (
              <Pressable
                key={nearbyUser.id}
                style={commonStyles.listItem}
                onPress={() => navigation.navigate('Chat', { user: nearbyUser })}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={commonStyles.listItemTitle}>{nearbyUser.name || nearbyUser.id}</Text>
                    <Text style={commonStyles.listItemSub}>{nearbyUser.id}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: statusColor, marginRight: 6 }} />
                      <Text style={[commonStyles.listItemSub, { fontSize: 12, textTransform: 'capitalize' }]}>
                        {nearbyUser.status}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[commonStyles.button, { minWidth: 100, paddingVertical: 8, paddingHorizontal: 12, marginVertical: 0, marginLeft: 12 }]}
                    onPress={() => navigation.navigate('Chat', { user: nearbyUser })}
                  >
                    <Text style={commonStyles.buttonText}>Message</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Embassies Section */}
        <View style={commonStyles.sectionContainer}>
          <Text style={commonStyles.sectionTitle}>Embassies</Text>
          <Text style={commonStyles.infoText}>No embassies nearby</Text>
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
