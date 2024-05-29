import mongoose from "mongoose";

// connection
async function connectMongodb(url){
    return mongoose.connect(url);
}

export default connectMongodb;