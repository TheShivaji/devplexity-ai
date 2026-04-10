import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/email.js';

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // Here you would normally save the user to the database
        // For this example, we'll just simulate a successful signup
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        });
        if (isUserAlreadyExists) {
            return res.status(400).json({ success: false, message: 'User with this email or username already exists' });
        }
        const newUser = new userModel({ email, password, username });
        await newUser.save();
        await sendEmail({
            to: email,
            subject: 'Welcome to Our App!',
            html: `<h1>Welcome, ${username}!</h1><p>Thank you for signing up for our app. We're excited to have you on board!</p>`
        });
        res.status(201).json({
            success: true, message: 'User created successfully',
            user: {
                ...newUser._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        console.error('Signup error:', error.message);
    }

}