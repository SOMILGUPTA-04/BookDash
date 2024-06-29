import express from "express";
import TRAIN from "../models/trains.js";

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const { fromLocation, toLocation, departureDate, returnDate, classChoice } = req.query;

        const trainData = await TRAIN.findOne({ From: fromLocation, To: toLocation, DepartDate: new Date(departureDate), ReturnDate: new Date(returnDate), Class:classChoice });
        // Initialize comparison result
        let comparisonResult = {};
        let data = [];
        
        // Compare the data
        if (trainData) {
            comparisonResult.from = trainData.From === fromLocation;
            comparisonResult.to = trainData.To === toLocation;
            comparisonResult.departDate = new Date(trainData.DepartDate).toISOString().split('T')[0] === departureDate;
            comparisonResult.returnDate = new Date(trainData.ReturnDate).toISOString().split('T')[0] === returnDate;
            comparisonResult.class = trainData.Class === classChoice;
            if (comparisonResult.from && comparisonResult.to && comparisonResult.departDate && comparisonResult.returnDate && comparisonResult.class) {
                data.push(trainData);
            }
        } else {
            comparisonResult.error = 'train not found';
        }
        
        console.log(comparisonResult);
        res.render('../views/displaytrains.ejs', {data});
    }catch(err){
        res.status(500)
    }
});

export default router;