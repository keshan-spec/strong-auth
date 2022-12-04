import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

// function to send email
export const sendEmail = async (to: string, subject: string, html: string) => {
    const info = await transporter.sendMail({ from: process.env.SMTP_SENDER, to, subject, html });
    console.log("Message sent: %s", info.messageId);
};
