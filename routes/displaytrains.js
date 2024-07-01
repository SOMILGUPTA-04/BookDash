import express from "express";
import TRAIN from "../models/trains.js";

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const { fromLocation, toLocation, departureDate, returnDate, classChoice } = req.query;
        // Initialize comparison result
        let comparisonResult = {};
        let data = [];

        if(fromLocation && toLocation && departureDate==='' && returnDate==='' && classChoice==='') {
            const trainData = await TRAIN.find({ From: fromLocation, To: toLocation });
            if (trainData) {
                trainData.forEach((train) => {
                    const comparisonResult = {
                        from: train.From === fromLocation,
                        to: train.To === toLocation
                    };
    
                    if (comparisonResult.from && comparisonResult.to) {
                        data.push(train);
                    }
                });
            } 
           else {
                comparisonResult.error = 'Flight not found';
            } 
            res.render('../views/displaytrains.ejs', { data});
        }
        const trainData = await TRAIN.findOne({ From: fromLocation, To: toLocation, DepartDate: new Date(departureDate), ReturnDate: new Date(returnDate), Class:classChoice });
        
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
        res.render('../views/displaytrains.ejs', {data});
    }catch(err){
        res.status(500)
    }
});

export default router;