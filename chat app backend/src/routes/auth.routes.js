const express = require('express');

const router =express.Router();


const authController = require('../controller/auth.controller')   
//require('./math') is how you say: “Give me the thing that math.js is exporting.”


router.get("/signUp",(req,res)=>{authController.signUp});
router.get("/login",(req,res)=>{authController.login});
router.get("/logout",(req,res)=>{authController.logout});




module.exports=router;     
//module.exports is how you say:  “Hey, this is the thing I want to share from this file
