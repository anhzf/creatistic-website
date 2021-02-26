import { fbs } from 'app/services/firebaseClient';

const fireStorage = {
  product: fbs.storage.ref('Products'),
  homeCarousel: fbs.storage.ref('HomeCarousel'),
};

export default fireStorage;
