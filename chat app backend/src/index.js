const express = require('express');

const app= express();
const authRoutes = require('./routes/auth.routes')

const connect_db = require('./lib/db');

app.use("/api/routes",authRoutes);
app.listen(5000,()=>{
    console.log("server started")
    connect_db();

});

app.get('/',(req,res)=>{res.send("hello")});