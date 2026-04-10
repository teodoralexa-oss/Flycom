import { Text, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export default function ChatScreen({ route }) {
  const selectedUser = route?.params?.user;
  const chatLabel = selectedUser ? selectedUser.name || selectedUser.id : 'No user selected';

  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.subtitle}>Chat Screen</Text>
      <Text style={commonStyles.infoText}>{chatLabel}</Text>
    </View>
  );
}
