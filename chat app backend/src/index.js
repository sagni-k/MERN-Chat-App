const express = require('express');

const app= express();
const authRoutes = require('./routes/auth.routes')

app.use("/api/routes",authRoutes);
app.listen(5000,()=>{console.log("server started")});

app.get('/',(req,res)=>{res.send("hello")});