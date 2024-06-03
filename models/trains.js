import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const TrainsSchema = new mongoose.Schema({
  TrainName:{
    type:String,
    required:true
  },
  TrainNumber:{
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
const TRAIN= mongoose.model("trains",TrainsSchema);
export default TRAIN;