import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';

//los views es como si fueran divs
//los text es como si fueran p o h1 etc

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blackBackground} />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign In to your account</Text>
      <TextInput
      style={styles.input}
      placeholder='email'
      ></TextInput>
      <TextInput 
      style={styles.input}
      placeholder='password'
      
      ></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 80,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 20,
    color: 'gray'
  },
  input:{
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    marginTop: 20,
    borderRadius: 30,
    height:50,
    backgroundColor:'white'
  },
  blackBackground:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '85%', // Ajusta este valor según la proporción que desees
    backgroundColor: '#333333',
  }
});
