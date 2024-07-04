import mongoose from 'mongoose';
const { Schema } = mongoose;

const FlightSchema = new mongoose.Schema({
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
});
const Flight=mongoose.model("flight",FlightSchema);
export default Flight;