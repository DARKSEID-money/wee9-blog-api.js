const mongoose = require("mongoose")


const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.mongodb_URI)
    console.log("MongoDB Connected Sucessfully")
    } catch (error) {
        console.error('DB Connection Failed');
        process.exit(1);
    }
};

module.exports = connectDB;