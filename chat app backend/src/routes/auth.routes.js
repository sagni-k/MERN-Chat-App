const express = require('express');

const router =express.Router();


router.get("/signUp",(req,res)=>{res.send("signup route")});
router.get("/login",(req,res)=>{res.send("login route")});
router.get("/logout",(req,res)=>{res.send("logout route")});

module.exports=router;