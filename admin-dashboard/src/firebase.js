// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "@firebase/firestore"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2nXSw9uKV4QI_3NnMys_faH2Nzl4ArME",
  authDomain: "clever-fit-6084a.firebaseapp.com",
  databaseURL: "https://clever-fit-6084a-default-rtdb.firebaseio.com",
  projectId: "clever-fit-6084a",
  storageBucket: "clever-fit-6084a.appspot.com",
  messagingSenderId: "593225190659",
  appId: "1:593225190659:web:be2970be06621d4f13ad36"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const  dbRealtime = getDatabase(app);