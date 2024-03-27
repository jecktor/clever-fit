import { Stack, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { auth, db } from '../utils/firebase';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (user) router.replace('/home');

  function handleSubmit() {
    if (!email || !password) return;

    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        get(ref(db, `users/${credentials.user.uid}`))
          .then((snapshot) => {
            const subscription = snapshot.val().subscription as any;

            if (subscription) router.replace('/home');
            else router.replace('/plans');
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message));
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Stack.Screen
          options={{ title: '', headerTransparent: true, statusBarTranslucent: true }}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="m@example.com"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
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
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderColor: '#E4E4E7',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
    width: '100%',
    marginBottom: 32,
  },
  container: {
    flex: 1,
    marginTop: 48,
    padding: 24,
  },
  mainContainer: {
    marginTop: 32,
    gap: 32,
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
  },
});
