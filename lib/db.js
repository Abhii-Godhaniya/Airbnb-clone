const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongDB connected");
    }catch(err){
        console.log("MongoDB connection error",err);
    }
    
};
module.exports = connectDB;