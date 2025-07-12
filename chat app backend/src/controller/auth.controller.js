const express = require('express');

const signUp = (req,res)=>{res.send("signup route")};

const login = (req,res)=>{res.send("login route")};

const logout = (req,res)=>{res.send("logout route")};


module.exports={signUp,login,logout};