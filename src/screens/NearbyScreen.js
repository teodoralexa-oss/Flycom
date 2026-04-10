import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { COLORS } from '../styles/colors';

export default function NearbyScreen({ navigation }) {
  const { nearbyUsers, isLoadingNearby, nearbyError, loadNearbyUsers } = useAppContext();

  useEffect(() => {
    if (nearbyUsers.length === 0 && !isLoadingNearby && !nearbyError) {
      loadNearbyUsers();
    }
  }, [nearbyUsers, isLoadingNearby, nearbyError, loadNearbyUsers]);

  if (isLoadingNearby) {
    return (
      <View style={commonStyles.screen}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text style={commonStyles.infoText}>Loading nearby users...</Text>
      </View>
    );
  }

  if (nearbyError) {
    return (
      <View style={commonStyles.screen}>
        <Text style={commonStyles.infoText}>{nearbyError}</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.listScreen}>
      <Text style={commonStyles.subtitle}>Nearby Users</Text>
      {nearbyUsers.map((nearbyUser) => (
        <Pressable
          key={nearbyUser.id}
          style={commonStyles.listItem}
          onPress={() => navigation.navigate('Chat', { user: nearbyUser })}
        >
          <Text style={commonStyles.listItemTitle}>{nearbyUser.name || nearbyUser.id}</Text>
          <Text style={commonStyles.listItemSub}>{nearbyUser.id}</Text>
        </Pressable>
      ))}
    </View>
  );
}
