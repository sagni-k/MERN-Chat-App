const mongoose = require('mongoose');


const connect_db= async ()=>{
    try {
        const conectionInstance=await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        console.log({
            host:conectionInstance.connection.host,
            port:conectionInstance.connection.port,
            db_name:conectionInstance.connection.name,
            readyState:conectionInstance.connection.readyState,
            //client:conectionInstance.connection.client,
        });
        
    } catch (error) {
        console.log("mongodb connection error "+error);
    }
    
} 

module.exports=connect_db;