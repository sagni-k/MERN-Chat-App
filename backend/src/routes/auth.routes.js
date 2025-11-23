const express = require('express');

const router =express.Router();

const protectRoute = require('../middleware/auth.middleware');
const authController = require('../controller/auth.controller');



router.post("/signUp",(req,res)=>{authController.signUp(req,res)});
router.post("/login",(req,res)=>{authController.login(req,res)});
router.post("/logout",(req,res)=>{authController.logout(req,res)});
router.put("/update-profile",protectRoute,(req,res)=>{authController.updateProfile(req,res)});
router.get("/check",protectRoute,(req,res)=>{authController.checkAuth(req,res)});



module.exports=router;     

