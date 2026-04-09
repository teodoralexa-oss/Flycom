import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ChatScreen from './src/screens/ChatScreen';
import { COLORS } from './src/styles/colors';
import { AppProvider } from './src/context/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.blue },
            headerTintColor: COLORS.white,
            contentStyle: { backgroundColor: COLORS.white },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FLYCOM' }} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Nearby" component={NearbyScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
