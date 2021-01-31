import * as firebaseAdmin from 'firebase-admin';

const fbsAccount = require('../../firebase-service-account.json');

// INITIALIZE FIREBASE
if (firebaseAdmin.apps.length) firebaseAdmin.app();
else firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(fbsAccount),
});

export default firebaseAdmin;

export const admin = {
  db: firebaseAdmin.firestore(),
} as const;
