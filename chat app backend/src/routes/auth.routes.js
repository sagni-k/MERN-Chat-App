const express = require('express');

const router =express.Router();


const authController = require('../controller/auth.controller')   
//require('./math') is how you say: “Give me the thing that math.js is exporting.”


router.post("/signUp",(req,res)=>{authController.signUp(req,res)});
router.post("/login",(req,res)=>{authController.login(req,res)});
router.post("/logout",(req,res)=>{authController.logout(req,res)});




module.exports=router;     
//module.exports is how you say:  “Hey, this is the thing I want to share from this file
