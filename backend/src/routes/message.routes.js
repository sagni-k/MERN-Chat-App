const express = require('express');
const protectRoute = require('../middleware/auth.middleware');
const messageController = require('../controller/message.controller');

const router =express.Router();

router.get("/users",protectRoute,(req,res)=>{messageController.getUsersExceptSelf(req,res)});
router.get("/:id",protectRoute,(req,res)=>messageController.getMessagesBetweenUserAndId(req,res));

router.post("/send/:id",protectRoute,(req,res)=>messageController.sendMessage(req,res));

module.exports=router;