const express = require('express');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app= express();
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
app.use(express.json());
app.use(cookieParser());
const connect_db = require('./lib/db');

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.listen(5000,()=>{
    console.log("server started")
    connect_db();

});

app.get('/',(req,res)=>{res.send("hello")});