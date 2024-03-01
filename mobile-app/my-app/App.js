import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './LandingPage';
import Login from './Login';
import Home from './Home';
import Home2 from './Home2';
import ChoosePlan from './ChoosePlan';
import qr from './qr';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Home2" component={Home2} options={{ headerShown: false }} />
            <Stack.Screen name="ChoosePlan" component={ChoosePlan} options={{ headerShown: true }} />
            <Stack.Screen name="qr" component={qr} options={{ headerShown: true }} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </>
  );
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 });