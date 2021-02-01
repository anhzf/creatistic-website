import React from 'react';
import ReactDOMServer from 'react-dom/server';
import firebase from 'firebase';
import fireCollection from 'app/fireCollection';
import gmailAuth from 'config/gmailAuth';
import { gmailTransporter } from 'app/services/nodemailerTransporter';
import GreetingMail from 'components/mails/Greeting';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NewsletterSubscriber } from 'types/models';
import absoluteUrl from 'next-absolute-url';

const storeNewSubscriber = (data: NewsletterSubscriber) => fireCollection.subscriber.add({
  ...data,
  _created: firebase.firestore.Timestamp.now(),
  _updated: firebase.firestore.Timestamp.now(),
  _deleted: null,
});

const sendGreetingEmail = ({ name, email }: NewsletterSubscriber, url: ReturnType<typeof absoluteUrl>) => {
  const el = React.createElement(GreetingMail, { name, url });
  const html = ReactDOMServer.renderToStaticMarkup(el);

  return gmailTransporter.sendMail({
    subject: 'Creatistic.ID Newsletter',
    from: gmailAuth.user,
    to: email,
    html,
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email } = JSON.parse(req.body) as NewsletterSubscriber;
    const save = await storeNewSubscriber({ name, email });
    const doc = await save.get();

    await sendGreetingEmail({ name, email }, absoluteUrl(req));

    res.status(200).json(doc.data());
  } else {
    res.status(400).json({ message: 'can\'t handle current request!' });
  }
};
