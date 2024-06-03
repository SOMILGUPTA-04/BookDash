import express from "express";
import TRAIN from "../models/trains.js";

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const data=await TRAIN.find();
        res.render('../views/displaytrains.ejs',{data});

    }catch(err){
        res.status(500)
    }
});

export default router;