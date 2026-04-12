import { transport, sender } from "./mailtrap.config.js";

import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplet.js";
import { WELCOME_EMAIL_TEMPLATE } from "./emailTemplet.js"



export const sendVerificationEmail = async (email, verificationToken) => {
    console.log("Preparing to send verification email to:", email); // Debugging line to check the email address being used

    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Verification email sent successfully! Message ID:", info.messageId);

    } catch (error) {
        console.error("Error sending verification email:", error.message);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Welcome to Our Platform",
            html: WELCOME_EMAIL_TEMPLATE(name, email),
            category: "Welcome Email",
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Welcome email sent successfully! Message ID:", info.messageId);

    } catch (error) {
        console.error("Error sending welcome email:", error.message);
    }
}
// The sendWelcomeEmail function is responsible for sending a welcome email to the user after they have successfully verified their email address. It takes the user's email and name as arguments, constructs the email options using a predefined template, and sends the email using the transport object. If the email is sent successfully, it logs the message ID; if there's an error, it logs the error message.
export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetLink),
            category: "Password Reset",
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Password reset email sent successfully! Message ID:", info.messageId);

    } catch (error) {
        console.error("Error sending password reset email:", error.message);
    }
}
// The sendPasswordResetConfirmationEmail function is responsible for sending a confirmation email to the user after they have successfully reset their password. It takes the user's email as an argument, constructs the email options using a predefined template, and sends the email using the transport object. If the email is sent successfully, it logs the message ID; if there's an error, it logs the error message.
export const sendPasswordResetConfirmationEmail = async (email) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Password reset confirmation email sent successfully! Message ID:", info.messageId);

    } catch (error) {
        console.error("Error sending password reset confirmation email:", error.message);
    }
}
