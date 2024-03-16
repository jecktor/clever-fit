import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA2nXSw9uKV4QI_3NnMys_faH2Nzl4ArME',
  authDomain: 'clever-fit-6084a.firebaseapp.com',
  databaseURL: 'https://clever-fit-6084a-default-rtdb.firebaseio.com',
  projectId: 'clever-fit-6084a',
  storageBucket: 'clever-fit-6084a.appspot.com',
  messagingSenderId: '593225190659',
  appId: '1:593225190659:web:be2970be06621d4f13ad36',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
