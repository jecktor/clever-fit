import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function Qr() {
  const userId = "EEFH7xsqqtf4Ui4fpFe32zB5vjx1"; // Obtén el ID del usuario al autenticarse

  const generateQRForUser = (userId) => {
    // Lógica para generar un código QR para el usuario específico
    return 'QR_' + userId + '_' + Math.floor(Math.random() * 1000000);
  };

  const [qrValue, setQrValue] = useState(generateQRForUser(userId));
  const [hasAccess, setHasAccess] = useState(false);

  const checkUserAccess = async () => {
    const auth = getAuth();
    const db = getDatabase();
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.access) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      });
    }
  };

  useEffect(() => {
    checkUserAccess();
  }, []);

  const onPressGenerate = () => {
    const newQrValue = generateQRForUser(userId);
    setQrValue(newQrValue);
  };

  return (
    <View style={styles.container}>
      {hasAccess ? (
        <>
          <Text style={styles.title}>Aquí está tu QR para acceder al GYM!</Text>
          <QRCode value={qrValue} size={200} />
          <TouchableOpacity style={styles.button} onPress={onPressGenerate}>
            <Text style={styles.buttonText}>Generar QR Aleatorio</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>No has pagado la mensualidad</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});
