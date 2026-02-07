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
    const options = ({
        expires: new Date(
            Date.now() + Number(process.env.JWS_OPT_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    })

    res.cookie("token", token, options
    )
    return token
}