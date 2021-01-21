import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const options: nodemailer.SendMailOptions = {
    from: process.env.GMAIL_USER,
    to: 'anh.dev7@gmail.com',
    subject: 'Gmail nodemailer Test!',
    text: 'lorem ipsum dolor sit amet!',
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    transporter.sendMail(options, function (error, info) {
        res.json({error, info})
    })
}