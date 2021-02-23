import type firebase from 'firebase';

export interface FireModelTimestamp {
  _created: firebase.firestore.Timestamp;
  _updated: firebase.firestore.Timestamp;
  _deleted: firebase.firestore.Timestamp | null;
}

export type ModelUI<T> = Record<string, unknown> & Partial<T>;

export interface NewsletterSubscriber {
  name: string;
  email: string;
}

export interface PriceDiscount {
  value: number;
  percent?: number;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  link: string;
  category: string;
  specs: Record<string, string>;
  discount?: PriceDiscount;
  _ui: ModelUI<{
    rating: number;
    reviews: number;
    sold: number;
  }>;
}

export type FireModel<T> = T & FireModelTimestamp;
