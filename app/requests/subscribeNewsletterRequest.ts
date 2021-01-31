import type { NewsletterSubscriber } from 'types/models';

const subscribeNewsletterRequest = (payload: NewsletterSubscriber) => new Request('/api/subscribeNewsletter', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export default subscribeNewsletterRequest;
