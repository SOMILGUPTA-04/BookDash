import mongoose from 'mongoose';
const { Schema } = mongoose;

const FlightSchema = new mongoose.Schema({
  FlightName:{
    type:String,
    required:true
  },
  FlightNumber:{
    type:Number,
    required:true,
    unique:true
  },
  From:{
    type:String,
    required:true
  },
  To:{
    type:String,
    required:true
  },
  DepartDate:{
    type:Date,
    required:true
  },
  ReturnDate:{
    type:Date,
    required:true
  },
  Class:{
    type:String,
    required:true
  },
  Price:{
    type:Number,
    required:true,
  },
});
const Flight=mongoose.model("flight",FlightSchema);
export default Flight;