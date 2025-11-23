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
const PORT = process.env.PORT;

//const __dirname = path.resolve();
app.use(cors({
    
    credentials:true,
})
    

)
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);




if(process.env.NODE_ENV ==="production"){
    const frontendPath = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(frontendPath,"index.html"));
    })
}



server.listen(PORT,()=>{
    console.log("server started")
    connect_db();

});

app.get('/',(req,res)=>{res.send("hello")});