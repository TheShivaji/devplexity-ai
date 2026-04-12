import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const gemail = process.env.GMAIL_USER;
const gpassword = process.env.GMAIL_PASS;

export const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gemail, // Yeh tera apna username hai
        pass: gpassword
    }
});

export const sender = {
    address: gemail, // Yeh tera apna email address hai
    name: "My MERN App",
};


