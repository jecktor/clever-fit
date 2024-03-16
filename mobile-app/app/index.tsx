import { Stack, Link, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

import { auth } from '../utils/firebase';

export default function Page() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (user) router.replace('/home');

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../assets/hero.png')}
          resizeMode="cover">
          <Stack.Screen
            options={{
              title: '',
              headerTransparent: true,
              statusBarTranslucent: true,
            }}
          />
        </ImageBackground>
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>Let's get started</Text>
            <Text style={styles.subtitle}>
              Hey there! Hope you're having a good day.{'\n'}
              Log in to start your journey.
            </Text>
          </View>
          <Link href={{ pathname: '/login' }} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#18181B',
    borderRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  info: {
    height: 280,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    maxWidth: 960,
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#71717A',
  },
});
