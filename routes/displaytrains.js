import express from "express";
import TRAIN from "../models/trains.js";

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const { fromtrain, totrain, departrain, classtrain } = req.query;
        // Initialize comparison result
        let comparisonResult = {};
        let data = [];

        if(fromtrain && totrain && departrain && classtrain==='') {
            const trainData = await TRAIN.find({ From: fromtrain, To: totrain , DepartDate: new Date(departrain) });
            if (trainData.length > 0) {
                // trainData.forEach((train) => {
                //     console.log(train);
                //     const comparisonResult = {
                //         from: train.From === fromLocation,
                //         to: train.To === toLocation,
                //         depart: new Date(trainData.DepartDate).toISOString().split('T')[0]  === departureDate
                //     };
    
                //     if (comparisonResult.from && comparisonResult.to && comparisonResult.depart) {
                //         data.push(train);
                //     }
                // });
                data=trainData;
            } 
           else {
                comparisonResult.error = 'Trains not found';
            }
        }
        else{
            const trainData = await TRAIN.findOne({ From: fromtrain, To: totrain, DepartDate: new Date(departrain), Class:classtrain });
            
            // Compare the data
            if (trainData) {
                comparisonResult.from = trainData.From === fromtrain;
                comparisonResult.to = trainData.To === totrain;
                comparisonResult.departDate = new Date(trainData.DepartDate).toISOString().split('T')[0] === departrain;
                comparisonResult.class = trainData.Class === classtrain;
                if (comparisonResult.from && comparisonResult.to && comparisonResult.departDate && comparisonResult.class) {
                    data.push(trainData);
                }
                } else {
                    comparisonResult.error = 'train not found';
                }
        }
        let FromCode =fromtrain.match(/\(([^)]+)\)/)[1];
        let ToCode = totrain.match(/\(([^)]+)\)/)[1];
        let formattedDepartureDate = departrain.split('-').reverse().join(''); // Formatting date to DDMMYYYY
        const ixigo = `https://www.ixigo.com/search/result/train/${FromCode}/${ToCode}/${formattedDepartureDate}//1/0/0/0/ALL`;
        
        formattedDepartureDate = departrain.split('-').join(''); // Formatting date to YYYYMMDD
        const goibibo = `https://www.goibibo.com/trains/dsrp/${FromCode}/${ToCode}/${formattedDepartureDate}/`;

        res.render('../views/displaytrains.ejs', {data ,ixigo,goibibo});
    }catch(err){
        res.status(500)
    }
});

export default router;