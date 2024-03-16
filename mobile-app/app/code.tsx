import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Page() {
  const { userId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Stack.Screen
          options={{
            title: '',
            headerTransparent: true,
            statusBarTranslucent: true,
          }}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Here's your code to access the gym</Text>
          <View style={styles.qr}>
            <QRCode value={userId as string} size={300} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  qr: {
    marginTop: 96,
    alignItems: 'center',
  },
});
