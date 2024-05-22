import mongoose from 'mongoose';
const { Schema } = mongoose;

const FlightSchema = new mongoose.Schema({
  FlightName:{
    type:String,
    required:true
  },
  FlightNumber:{
    type:Number,
    required:true
  },
  From:{
    type:String,
    required:true
  },
  To:{
    type:String,
    required:true
  },
  Date:{
    type:Date,
    required:true
  },
  Status:{
    type:String,
    required:true
  },
  
});
export default mongoose.model("flight",FlightSchema);