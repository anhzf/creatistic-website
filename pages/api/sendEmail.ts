import { gmailTransporter } from 'app/services/nodemailerTransporter';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const options: nodemailer.SendMailOptions = {
    from: process.env.GMAIL_USER,
    to: 'anh.dev7@gmail.com',
    subject: 'Gmail nodemailer Test!',
    text: 'lorem ipsum dolor sit amet!',
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    gmailTransporter.sendMail(options, function (error, info) {
        res.json({error, info})
    })
}
