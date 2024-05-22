import mongoose from 'mongoose';
const { Schema } = mongoose;

const TrainsSchema = new mongoose.Schema({
  TrainName:{
    type:String,
    required:true
  },
  TrainNumber:{
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
export default mongoose.model("trains",TrainsSchema);
