import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';

export default function LandingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground 
      style={styles.img} 
      source={require('./img/logo.jpg')}
      resizeMode='cover'>
        <StatusBar style="auto" />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.lText}>Let's get started</Text>
        <Text style={styles.Text}>
          Hey! I hope you're having a good day.{'\n'}
          To start using the app, log in.
        </Text>
      </View>
      <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.login}>Log in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  img:{
    flex:.75,
  },
  lText:{
    textAlign:'left',
    fontSize:30,
    fontWeight:'bold',
    paddingTop:20,
    paddingLeft:20,
    marginBottom:20,
  },
  Text:{
    textAlign:'left',
    fontSize:17,
    paddingLeft:20,
  },
  textContainer:{
    paddingLeft: 3,
    marginBottom: 20,
  },
  login:{
    fontSize:17,
  },
  loginButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#B5C0D0',
  },
});