import type fb from 'firebase';

export interface FireModelTimestamp {
  _created: fb.firestore.Timestamp;
  _updated: fb.firestore.Timestamp;
  _deleted: fb.firestore.Timestamp | null;
}

export type ModelUI<T> = Record<string, unknown> & Partial<T>;

export interface Address {
  country: string;
  province: string;
  city: string;
  streetName: string;
}

export type IndonesiaAddress = Address & {
  district: string;
  village: string;
};

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

export interface Order {
  ordererName: string;
  productId: string;
  amount: number;
  contactPerson: string;
  shippingAddress: IndonesiaAddress;
  notes: string;
  _ui: ModelUI<{
    productName: string;
  }>
}

export type FireModel<T> = T & FireModelTimestamp;
