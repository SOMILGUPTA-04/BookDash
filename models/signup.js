import mongoose from "mongoose"
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
        UserName:{
            type:String,
            required:true,
            unique:true
        },

        Email:{
            type:String,
            required:true,
            unique:true
        },

        Password:{ 
            type:String,
            required: true,
        }
    });

const Signup=mongoose.model('signup', userSchema);
export default Signup;