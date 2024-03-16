import { router } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';

import { auth, db } from '../utils/firebase';

interface Subscription {
  plan: string;
  cancelled: number;
  currentPeriodEnd: number;
}

export function useFirebaseUser() {
  const [user, setUser] = useState(auth.currentUser);
  const [subscription, setSubscription] = useState<Subscription>();
  const [lockerId, setLockerId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.replace('/login');

      setUser(user);

      const userRef = ref(db, `users/${user?.uid}`);

      onValue(userRef, (snapshot) => {
        const sub = snapshot.val().subscription || null;
        const locker = snapshot.val().locker || '';

        // @ts-ignore
        user!.displayName = snapshot.val().name || 'Anonymous';

        if (sub) setSubscription(sub);
        if (locker) setLockerId(locker);

        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

  return { user, subscription, lockerId, loading };
}
