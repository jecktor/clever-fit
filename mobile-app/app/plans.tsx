import { Stack, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { useFirebaseUser } from '../hooks';
import { checkout } from '../utils/stripe';

interface CardProps {
  title: string;
  desc: string;
  features: string[];
  onPress: () => void;
  selected?: boolean;
}

function Card({ title, desc, features, onPress, selected = false }: CardProps) {
  return (
    <TouchableOpacity
      style={selected ? cardStyles.selected : cardStyles.container}
      onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={cardStyles.title}>{title}</Text>
        {selected && <Image source={require('../assets/check.png')} />}
      </View>
      <Text style={cardStyles.desc}>{desc}</Text>
      <View style={{ gap: 6 }}>
        {features.map((feature, i) => (
          <Text key={i} style={cardStyles.list}>
            • {feature}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function Page() {
  const { user, subscription, loading } = useFirebaseUser();
  const [plan, setPlan] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (subscription) router.replace('/home');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [subscription]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Stack.Screen
          options={{
            title: '',
            headerLeft: () => <></>,
            headerTransparent: true,
            statusBarTranslucent: true,
            gestureEnabled: false,
          }}
        />
        {loading || !user || subscription ? (
          <Text style={styles.title}>Loading...</Text>
        ) : (
          <>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>Choose your plan</Text>
              <Card
                title="Basic plan"
                desc="$20/month"
                features={['Access to all gym facilities.']}
                onPress={() => setPlan(0)}
                selected={plan === 0}
              />
              <Card
                title="Pro plan"
                desc="$25/month"
                features={['Access to all gym facilities.', 'Locker included.']}
                onPress={() => setPlan(1)}
                selected={plan === 1}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => checkout(plan, user.uid)}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#E4E4E7',
  },
  selected: {
    padding: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#18181B',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    color: '#71717A',
    marginBottom: 24,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E4E4E7',
    borderRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  buttonText: {
    color: '#18181B',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  list: {
    fontSize: 16,
    color: '#71717A',
    marginLeft: 8,
  },
});

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
