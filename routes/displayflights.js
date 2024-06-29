import express from "express";
import Flight from "../models/flight.js"

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const { fromLocation, toLocation, departureDate, returnDate, classChoice } = req.query;

        const flightData = await Flight.findOne({ From: fromLocation, To: toLocation, DepartDate: new Date(departureDate), ReturnDate: new Date(returnDate), Class:classChoice });

        // Initialize comparison result
        let comparisonResult = {};
        let data = [];
        
        // Compare the data
        if (flightData) {
            comparisonResult.from = flightData.From === fromLocation;
            comparisonResult.to = flightData.To === toLocation;
            comparisonResult.departDate = new Date(flightData.DepartDate).toISOString().split('T')[0] === departureDate;
            comparisonResult.returnDate = new Date(flightData.ReturnDate).toISOString().split('T')[0] === returnDate;
            comparisonResult.class = flightData.Class === classChoice;
            if (comparisonResult.from && comparisonResult.to && comparisonResult.departDate && comparisonResult.returnDate && comparisonResult.class) {
                data.push(flightData);
            }
        } 
       else {
            comparisonResult.error = 'Flight not found';
        } 
        
        
        console.log(comparisonResult);
        res.render('../views/displayflights.ejs', { data});
    }catch(err){
        res.status(500)
    }
});

export default router;