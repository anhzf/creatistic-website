import fireCollection from 'app/fireCollection';
import type { Product } from 'types/models';

export const getProductBy = function (keyName: keyof Product) {
  return async (payload: Product[typeof keyName]) => {
    const query = fireCollection.product.where(keyName, '==', payload);
    const { docs } = await query.get();

    return docs.length ? docs[0] : null;
  }
};

export const getProductByLink = getProductBy('link');
