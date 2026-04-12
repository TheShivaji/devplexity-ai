import jwt from "jsonwebtoken"

export const generateJwtToken = (res, userId) => {
    const token = jwt.sign({
        id: userId
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" })

    // Set the token in an HTTP-only cookie
    res.cookie("token" , token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    return token
}
