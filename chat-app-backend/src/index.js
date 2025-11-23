const express = require('express');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();
const {app,server} = require('./lib/socket');
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
const connect_db = require('./lib/db');


const __dirname = path.resolve();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
})
    

)
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);




if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}



server.listen(5000,()=>{
    console.log("server started")
    connect_db();

});

app.get('/',(req,res)=>{res.send("hello")});