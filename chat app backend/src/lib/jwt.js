const jwt = require('jsonwebtoken')


//As far as I have understood , 
//whenever an user signs up or logins in my app, 
//I generate an encrypted version of his user id in my backend 
//and then in the response 
//object I use a function res.cookie to store it in his cookies
const generateToken =(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });

    res.cookie("chat_app_jwt_token",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",

    });

    return token;
}

module.exports=generateToken;