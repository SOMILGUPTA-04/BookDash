import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const TrainsSchema = new mongoose.Schema({
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
  Class:{
    type:String,
    required:true
  },
});
const TRAIN= mongoose.model("trains",TrainsSchema);
export default TRAIN;