const express = require('express');
const User= require('../models/user.models')
const Message = require('../models/message.models')
const cloudinary = require('../lib/cloudinary');
const { getRecieverSocketId, io} = require('../lib/socket');


const getUsersExceptSelf = async (req,res)=>{
    try {
        const userId=req.user._id;

        const filteredUsers = await User.find({_id:{$ne:userId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
}


const getMessagesBetweenUserAndId = async (req,res)=>{
    try {
        const userId=req.user._id;
        const {id:ChatWithId} = req.params;
        const messages = await Message.find({
            $or:[
                {senderId:userId,recieverId:ChatWithId},
                {senderId:ChatWithId,recieverId:userId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const sendMessage = async (req,res) => {
    try {
        const senderId=req.user._id;
        const recieverId = req.params.id; 

        const {text,image} = req.body;

        let imageUrl;

        if(image){
            const url = await cloudinary.uploader.upload(image);
            imageUrl=url.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        });
        await newMessage.save();


        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}





module.exports={getUsersExceptSelf,getMessagesBetweenUserAndId,sendMessage}