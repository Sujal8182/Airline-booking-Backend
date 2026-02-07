const jws = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

// exports.TokenGenerate = (id, role, res) => {
//     if (res.headersSent) {
//         throw new Error("Headers already sent before setting cookie")
//     }
//     const token = jws.sign({ id, role }, process.env.JWS_CODE, {
//         expiresIn: process.env.JWS_EXPIRE
//     })
//     const isProduction = process.env.NODE_ENV === 'production';
//     // const options = ({
//     //     expires: new Date(
//     //         Date.now() + process.env.JWS_OPT_EXPIRE * 24 * 60 * 60 * 1000
//     //     ),
//     //     // httpOnly: true,
//     //     // sameSite: isProduction ? "none" : "lax",
//     //     // secure: isProduction,
//     // })
//     res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "none", // REQUIRED for React + Express
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
//     return token
// }

exports.TokenGenerate = (id, role, res) => {
    if (res.headersSent) {
        throw new Error("Headers already sent before setting cookie")
    }
    const token = jws.sign({ id, role }, process.env.JWS_CODE, {
        expiresIn: process.env.JWS_EXPIRE
    })
    // const isProduction = process.env.NODE_ENV === 'production';
    const options = ({
        expires: new Date(
            Date.now() + process.env.JWS_OPT_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
    })
    res.cookie("token", token, options);
    console.log(process.env.JWS_CODE);
    console.log(process.env.JWS_OPT_EXPIRE);
    console.log(process.env.NODE_ENV);
    return token


}