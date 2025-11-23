const express = require('express');
const bcrypt= require('bcrypt');
const User= require('../models/user.models')
const generateToken = require('../lib/jwt');
const cloudinary = require('../lib/cloudinary');

const signUp = async (req,res)=> {

    

    try {
        const {fullName,email,password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message:"invalid request"})
        }
        
        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }

        const userExists = await User.exists({email});
        if(userExists){
            return res.status(400).json({message:"email already exists"})
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await User.create({
                fullName,
                email,
                password:hashedPassword
            })

            if(newUser){
                generateToken(newUser._id,res,);
                await newUser.save();
                res.status(201).json({
                    _id:newUser._id,
                    fullName:newUser.fullName,
                    email:newUser.email,
                    
                });
            }else{
                res.status(400).json({message:"Invalid User data"});
            }

            
        }
    } catch (error) {
        
        res.status(500).json({ message: "Server error", error: error.message });
        
        
    }


}

const login = async (req,res)=>{



    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"invalid request"})
        }
        const user = await User.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                generateToken(user._id,res,);
                res.status(200).json({ 
                    message: "user logged in",
                    id: user._id,
                    fullName: user.fullName,
                    email:user.email,
                });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        }
        else{
            res.status(400).json({message:"Invalid credentials"})
        }
        

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        
    }


};

const logout = (req,res)=>{

    try {
        res.clearCookie("chat_app_jwt_token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
        res.status(200).json({message:"logged out"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
};

const updateProfile = async (req,res)=>{


    try {
        const {profilePic} = req.body;

        if(!profilePic){
        return res.status(400).json({message:"profile picture missing"})
        }
        const userId = req.user._id;

        const url = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePicture:url.secure_url},
            {new:true}
        )

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({message: "Server error", error: error.message})
    }
    

}


const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
    
}


module.exports={signUp,login,logout,updateProfile,checkAuth};