const jws = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.TokenGenerate = (id, role, res) => {
    if (res.headersSent) {
        throw new Error("Headers already sent before setting cookie")
    }
    const token = jws.sign({ id, role }, process.env.JWS_CODE, {
        expiresIn: process.env.JWS_EXPIRE
    })
    const isProduction = process.env.NODE_ENV === 'production';
    // const options = ({
    //     expires: new Date(
    //         Date.now() + process.env.JWS_OPT_EXPIRE * 24 * 60 * 60 * 1000
    //     ),
    //     // httpOnly: true,
    //     // sameSite: isProduction ? "none" : "lax",
    //     // secure: isProduction,
    // })
    const cookieDays = Number(process.env.JWS_OPT_EXPIRE || 1)
    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,               // MUST be true for SameSite=None
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieDays * 24 * 60 * 60 * 1000, // safer than `expires`
    })
    return token
}