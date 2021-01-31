import React from 'react';
import ReactDOMServer from 'react-dom/server';
import firebaseAdmin, { admin } from 'app/services/firebaseAdmin';
import fireCollection from 'app/fireCollection';
import gmailAuth from 'config/gmailAuth';
import { gmailTransporter } from 'app/services/nodemailerTransporter';
import GreetingMail from 'components/mails/Greeting';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NewsletterSubscriber } from 'types/models';

const storeNewSubscriber = (data: NewsletterSubscriber) => fireCollection(admin.db).subscriber.add({
  ...data,
  _created: firebaseAdmin.firestore.Timestamp.now(),
  _updated: firebaseAdmin.firestore.Timestamp.now(),
  _deleted: null,
});

const sendGreetingEmail = ({ name, email }: NewsletterSubscriber) => {
  const el = React.createElement(GreetingMail, { name });
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

    await sendGreetingEmail({ name, email });

    res.status(200).json(doc.data());
  } else {
    res.status(400).json({ message: 'can\'t handle current request!' });
  }
};
