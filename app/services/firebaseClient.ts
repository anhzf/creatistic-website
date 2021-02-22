import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import { emulators } from "firebase.json";
import firebaseConfig from 'config/firebaseConfig';


// INITIALIZE FIREBASE
if (firebase.apps.length) firebase.app();
else firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

if (process.env.NODE_ENV === 'development') {
  const DEV_HOST = 'localhost';
  const authUrlEmulator = new URL('http://localhost/');
  authUrlEmulator.hostname = DEV_HOST;
  authUrlEmulator.port = emulators.auth.port.toString();

  db.useEmulator(DEV_HOST, emulators.firestore.port);
  auth.useEmulator(authUrlEmulator.toString());
}

export default firebase;

export const fbs = {
  auth, db, storage,
} as const;
