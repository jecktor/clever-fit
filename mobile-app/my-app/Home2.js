import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Home2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, User</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Basic Plan</Text>
          <Text style={styles.boxText1}>
            Your plan will end on 12/12/2021.
          </Text>
          <Pressable style={styles.button2}>
            <Text style={styles.buttonText}>Renew plan</Text>
          </Pressable>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Locker rental</Text>
          <Text style={styles.boxText2}>
            You haven't rented a locker.
          </Text>
          
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Rent a locker</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.accessCodeButton}
          onPress={() => navigation.navigate('qr')}
        >
          <Text style={styles.accessCodeButtonText}>Access code</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginTop: 70,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginBottom: 100,
  },
  box: {
    marginTop: 30,
    borderWidth: 1,
    padding: 60,
    borderColor: '#ddd', 
    borderRadius: 5,
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  boxText1: {
    marginTop: 10,
    textAlign: 'justify',
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#B5C0D0', 
  },
  button2: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width:380,
  },
  accessCodeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  accessCodeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  boxText2: {
    marginTop: 10,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
 
});

export default Home2;
