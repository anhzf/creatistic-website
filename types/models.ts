import type firebase from 'firebase';

export interface FireModelTimestamp {
  _created: firebase.firestore.Timestamp;
  _updated: firebase.firestore.Timestamp;
  _deleted: firebase.firestore.Timestamp | null;
}

export interface NewsletterSubscriber {
  name: string;
  email: string;
}

export type FireModel<T> = T & FireModelTimestamp;
