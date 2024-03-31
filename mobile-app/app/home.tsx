import { Stack, Link, router } from 'expo-router';
import { onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  type ImageSourcePropType,
} from 'react-native';

import { useFirebaseUser } from '../hooks';
import { auth, db } from '../utils/firebase';
import { manageSubscription } from '../utils/stripe';

interface CardProps {
  title: string;
  desc: string;
  action: string;
  background: ImageSourcePropType;
  onPress: () => void;
}

function Card({ title, desc, action, background, onPress }: CardProps) {
  return (
    <ImageBackground source={background} resizeMode="cover">
      <View style={cardStyles.container}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.desc}>{desc}</Text>
        <TouchableOpacity style={cardStyles.button} onPress={onPress}>
          <Text style={cardStyles.buttonText}>{action}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

interface Locker {
  number: number;
  hasItems: boolean;
}

export default function Page() {
  const { user, subscription, lockerId, loading } = useFirebaseUser();
  const [locker, setLocker] = useState<Locker>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!subscription) router.replace('/plans');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [subscription]);

  useEffect(() => {
    if (!lockerId) return;

    const lockerRef = ref(db, `lockers/entries/${lockerId}`);
    onValue(lockerRef, (snapshot) => {
      setLocker(snapshot.val());
    });
  }, [lockerId]);

  function handleOpenLocker() {
    if (!locker) return;

    update(ref(db, `lockers/entries/${lockerId}`), {
      open: true,
    });
  }

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
        {loading || !user || !subscription ? (
          <Text style={styles.title}>Loading...</Text>
        ) : (
          <>
            <View style={styles.mainContainer}>
              <View style={styles.head}>
                <Text style={styles.title}>Welcome, {user.displayName!.split(' ')[0]}</Text>
                <TouchableOpacity onPress={() => auth.signOut()}>
                  <Image source={require('../assets/logout.png')} />
                </TouchableOpacity>
              </View>
              <Card
                title={`${subscription.plan} plan`}
                desc={`Your plan will ${subscription.cancelled ? 'end' : 'renew'} on ${new Date(
                  subscription.currentPeriodEnd
                ).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}.`}
                action="Manage subscription"
                background={require('../assets/plan.png')}
                onPress={() => manageSubscription(user.uid)}
              />
              {locker ? (
                <Card
                  title={`Locker #${locker.number}`}
                  desc={locker.hasItems ? "Don't forget your belongings." : 'Nothing inside.'}
                  action="Open locker"
                  background={require('../assets/locker.png')}
                  onPress={handleOpenLocker}
                />
              ) : (
                <Card
                  title="Locker rental"
                  desc="Upgrade your plan to access a locker."
                  action="Upgrade plan"
                  background={require('../assets/locker.png')}
                  onPress={() => manageSubscription(user.uid)}
                />
              )}
            </View>
            <Link href={{ pathname: '/code', params: { userId: user.uid } }} asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Access code</Text>
              </TouchableOpacity>
            </Link>
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
});

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
