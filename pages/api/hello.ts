import { NextApiHandler } from 'next'
import absoluteUrl from 'next-absolute-url';

export default ((req, res) => {
  res.status(200).json(absoluteUrl(req));
}) as NextApiHandler
