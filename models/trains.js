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
  Date:{
    type:Date,
    required:true
  },
  Status:{
    type:String,
    required:true
  }
});
const TRAIN= mongoose.model("trains",TrainsSchema);
export default TRAIN;