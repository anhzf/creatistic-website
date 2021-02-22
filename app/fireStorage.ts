import { fbs } from 'app/services/firebaseClient';

const fireStorage = {
  product: fbs.storage.ref('Products'),
};

export default fireStorage;
