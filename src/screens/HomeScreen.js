import { Text, TextInput, View } from 'react-native';
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
    <View style={commonStyles.screen}>
      <Text style={commonStyles.title}>FLYCOM</Text>
      <Text style={commonStyles.infoText}>
        {isLoadingUser ? 'Loading user...' : `User: ${displayName}`}
      </Text>
      <TextInput
        style={commonStyles.input}
        value={usernameInput}
        onChangeText={setUsernameInput}
        placeholder="Set username"
        autoCapitalize="none"
      />
      <NavButton label="Save Username" onPress={saveUsername} />
      <NavButton label="Go to Map" onPress={goToMap} />
      <NavButton label="Go to Nearby" onPress={goToNearby} />
      <NavButton label="Go to Chat" onPress={goToChat} />
    </View>
  );
}
