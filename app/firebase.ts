import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { emulators } from "../firebase.json";

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
} as const;

if (firebase.apps.length) firebase.app();
else firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

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
    auth, db,
} as const;

export const collection = {
    subscriber: fbs.db.collection('Subscribers'),
} as const;
