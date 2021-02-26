import { fbs } from 'app/services/firebaseClient';
import type firebase from 'firebase';
import type { FireModel, NewsletterSubscriber, Order, Product } from 'types/models';

type CollectionReference<T> = firebase.firestore.CollectionReference<FireModel<T>>;

const fireCollection = {
  subscriber: fbs.db.collection('Subscribers') as CollectionReference<NewsletterSubscriber>,
  product: fbs.db.collection('Products') as CollectionReference<Product>,
  order: fbs.db.collection('Orders') as CollectionReference<Order>,
} as const;

export default fireCollection;
