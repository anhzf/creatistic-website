import React from 'react';
import ReactDOMServer from 'react-dom/server';
import firebase from 'firebase';
import absoluteUrl from 'next-absolute-url';
import fireCollection from 'app/fireCollection';
import gmailAuth from 'config/gmailAuth';
import { gmailTransporter } from 'app/services/nodemailerTransporter';
import GreetingMail from 'components/mails/Greeting';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NewsletterSubscriber } from 'types/models';

const ERROR_MSG = {
  alreadyRegistered: 'email sudah terdaftar',
  somethingError: 'mohon maaf, terjadi kesalahan...',
  cantHandle: 'mohon maaf, permintaan anda tidak dapat ditangani...',
}

const storeNewSubscriber = async (data: NewsletterSubscriber) => {
  const exists = await fireCollection.subscriber.where('email', '==', data.email).get();

  if (exists.empty) {
    return fireCollection.subscriber.add({
      ...data,
      _created: firebase.firestore.Timestamp.now(),
      _updated: firebase.firestore.Timestamp.now(),
      _deleted: null,
    });
  }

  throw new Error(ERROR_MSG.alreadyRegistered);
};

const sendGreetingEmail = ({ name, email }: NewsletterSubscriber, url: ReturnType<typeof absoluteUrl>) => {
  const el = React.createElement(GreetingMail, { name, url });
  const html = ReactDOMServer.renderToStaticMarkup(el);

  return gmailTransporter.sendMail({
    subject: 'Creatistic.ID Newsletter',
    from: gmailAuth.user,
    to: email,
    html,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email } = JSON.parse(req.body) as NewsletterSubscriber;

    try {
      await storeNewSubscriber({ name, email });
      await sendGreetingEmail({ name, email }, absoluteUrl(req));

      res.status(200).json({ success: true });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false, message: ERROR_MSG.cantHandle });
  }
};
