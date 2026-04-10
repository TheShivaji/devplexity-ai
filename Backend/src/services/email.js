import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});
console.log("Google user:", process.env.GOOGLE_USER);
console.log("Google client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google client secret:", process.env.GOOGLE_CLIENT_SECRET ? '***' : 'Not set');
console.log("Google refresh token:", process.env.GOOGLE_REFRESH_TOKEN ? '***' : 'Not set');

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email is sending")
};