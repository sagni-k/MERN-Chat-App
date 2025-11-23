const jwt = require('jsonwebtoken');
const User= require('../models/user.models')

const protectRoute = async (req,res,next) => {

    try {
        const token = req.cookies.chat_app_jwt_token;
        if(!token){
            return res.status(401).json({message:"no token attached"})
        }
        const userTokenData = jwt.verify(token,process.env.JWT_SECRET);

        if(!userTokenData){
            return res.status(400).json({message:"Invalid token"})
        }

        const user = await User.findById(userTokenData.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        req.user=user;

        next();
    } catch (error) {
        
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message,
        })
    }
}




module.exports=protectRoute;