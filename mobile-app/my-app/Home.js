import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2nXSw9uKV4QI_3NnMys_faH2Nzl4ArME",
  authDomain: "clever-fit-6084a.firebaseapp.com",
  databaseURL: "https://clever-fit-6084a-default-rtdb.firebaseio.com",
  projectId: "clever-fit-6084a",
  storageBucket: "clever-fit-6084a.appspot.com",
  messagingSenderId: "593225190659",
  appId: "1:593225190659:web:be2970be06621d4f13ad36",
};

const Home = ({ navigation }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const user = auth.currentUser;

  function handleManageSubscription() {
    fetch("http://localhost:3001/create-billing-portal-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId: user.uid }),
    })
      .then((res) => res.json())
      .then(({ url }) => Linking.openURL(url))
      .catch(console.error);
  }

  const openLocker = (lockerId) => {
    update(ref(db, "lockers/entries/" + lockerId), {
      open: true,
    });
  };

  const handleLockerPress = () => {
    onValue(ref(db, "users/" + user.uid), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        openLocker(data.locker);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {user.displayName || "Guest"}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Pro Plan</Text>
          <Text style={styles.boxText1}>
            Your payment will renew on 12/12/2021.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => handleManageSubscription()}
          >
            <Text style={styles.buttonText}>Change plan</Text>
          </Pressable>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Locker #7</Text>
          <Text style={styles.boxText2}>Rented until 12/12/2021.</Text>
          <Text style={styles.boxText1}>Nothing inside.</Text>
          <Pressable style={styles.button} onPress={handleLockerPress}>
            <Text style={styles.buttonText}>Open Locker</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.accessCodeButton}
          onPress={() => navigation.navigate("qr")}
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
    backgroundColor: "white",
  },
  header: {
    marginTop: 70,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    marginBottom: 100,
  },
  box: {
    marginTop: 30,
    borderWidth: 1,
    padding: 60,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  boxText1: {
    marginTop: 10,
    textAlign: "justify",
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#B5C0D0",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 380,
  },
  accessCodeButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
    alignItems: "center",
    backgroundColor: "black",
    width: 340,
  },
  accessCodeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  boxText2: {
    marginTop: 10,
    textAlign: "justify",
    fontWeight: "bold",
  },
});

export default Home;
