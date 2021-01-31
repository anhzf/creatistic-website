import type firebase from 'firebase';
import type { FireModel, NewsletterSubscriber } from 'types/models';

type CollectionReference<T> = firebase.firestore.CollectionReference<FireModel<T>>;
type getDb = firebase.firestore.Firestore | FirebaseFirestore.Firestore;

const fireCollection = (db: getDb) => ({
  subscriber: db.collection('Subscribers') as CollectionReference<NewsletterSubscriber>,
} as const);

export default fireCollection;
