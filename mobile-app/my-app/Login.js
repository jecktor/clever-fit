import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { StatusBar } from 'expo-status-bar';

const firebaseConfig = {
  apiKey: "AIzaSyA2nXSw9uKV4QI_3NnMys_faH2Nzl4ArME",
  authDomain: "clever-fit-6084a.firebaseapp.com",
  databaseURL: "https://clever-fit-6084a-default-rtdb.firebaseio.com",
  projectId: "clever-fit-6084a",
  storageBucket: "clever-fit-6084a.appspot.com",
  messagingSenderId: "593225190659",
  appId: "1:593225190659:web:be2970be06621d4f13ad36"
};


const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, handleAuthentication }) => {
  return (
    <View style={styles.container1}>
      <Text style={styles.welcomeTittle}>Welcome back</Text>
      <View style={styles.inputView}>
      <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button title={isLogin ? 'Log in' : 'Sign Up'} onPress={handleAuthentication} color="white" />
      </View>
    </View>
  );
}

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <Text>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

export default App = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1:{
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    
  },
  container: {
    marginTop: 100,
    marginLeft: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    width: 380,
  },
  welcomeTittle:{
    fontSize: 30,
    marginBottom: 16,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  inputText:{
    fontWeight: 'bold',
  },
  inputView:{
    marginTop: 30,
  },
  buttonStyle: {
    borderRadius: 6,
    backgroundColor:'black',
    width: 380,
    marginTop: 400,
  },
});