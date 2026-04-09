import { Text, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export default function ChatScreen() {
  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.subtitle}>Chat Screen</Text>
    </View>
  );
}
