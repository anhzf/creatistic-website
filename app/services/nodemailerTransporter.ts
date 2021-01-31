import gmailAuth from 'config/gmailAuth';
import nodemailer from 'nodemailer'

export const gmailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: gmailAuth,
});
