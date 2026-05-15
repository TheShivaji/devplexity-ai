// all This commemted is for my review purpose only, I will remove it later

import { User } from "../model/user.model.js"
import { generateJwtToken } from "../../utils/generateJwtToken.js"
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js"
import bcryptjs from "bcryptjs"




export const signup = async (req, res) => {
    const { email, password, username } = req.body
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "Please provide all the fields" })
        }

        const isAlreadyUser = await User.findOne({ email })
        if (isAlreadyUser) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }


        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const user = await User({
            email,
            password,
            username,

            // Verification token and its expiry time for email verification
            verificationToken: verificationToken,
            verificationTokenExpiredAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours

        })
        await user.save()
        generateJwtToken(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)


        //password is set to undefined to avoid sending it in the response because we don't want to expose the hashed password to the client. Even though it's hashed, it's a good security practice to not include it in the response.
        return res.status(201).json({
            success: true, message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in signup:", error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "invalid credentials" })
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "invalid credentials" })
        }

        generateJwtToken(res, user._id)


        user.lastlogin = Date.now()
        await user.save()
        return res.status(200).json({
            success: true, message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Error in login:", error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
// The verifyOtp function is responsible for verifying the OTP (One-Time Password) sent to the user's email during the signup process. It checks if the provided OTP matches a user in the database and if the OTP has not expired. If the OTP is valid, it marks the user's email as verified, clears the verification token and its expiry time, and sends a welcome email to the user. Finally, it returns a success response. If the OTP is invalid or expired, or if there's an error during the process, it returns an appropriate error response.
export const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: otp,
            verificationTokenExpiredAt: { $gt: Date.now() }
        });
        console.log(user);

        // Agar user nahi mila ya OTP expire ho gaya
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        await sendWelcomeEmail(user.email, user.name)
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiredAt = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.log("Error in OTP verification:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            // Clear the invalid token cookie
            res.cookie("token", "", { maxAge: 0 });
            return res.status(404).json({ success: false, message: "User not found" })
        }
        return res.status(200).json({
            success: true, message: "User found successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in getMe:", error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            maxAge: 0            // immediately expire
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log("Error in logout:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
