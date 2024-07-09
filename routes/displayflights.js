import express from "express";
import Flight from "../models/flight.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { fromLocation, toLocation, departureDate,returnDate, classChoice } = req.query;
        let data = [];

        if (fromLocation && toLocation && departureDate === '' && returnDate === '' && classChoice === '') {
            const flightData = await Flight.find({ From: fromLocation, To: toLocation });
            if (flightData.length > 0) {
                data = flightData;
            } else {
                console.log('Flight not found');
            }
            return res.render('../views/displayflights.ejs', { data });
        }

        const query = {
            From: fromLocation,
            To: toLocation,
            DepartDate: new Date(departureDate),
            ReturnDate: new Date(returnDate),
            Class: classChoice.toUpperCase() // Ensure class choice matches case
        };


        const flightData = await Flight.findOne(query);
        
        if (flightData) {
            const comparisonResult = {
                from: flightData.From === fromLocation,
                to: flightData.To === toLocation,
                departDate: new Date(flightData.DepartDate).toISOString().split('T')[0] === departureDate,
                returnDate: new Date(flightData.ReturnDate).toISOString().split('T')[0] === returnDate,
                class: flightData.Class === classChoice.toUpperCase()
            };

            if (comparisonResult.from && comparisonResult.to && comparisonResult.departDate && comparisonResult.returnDate && comparisonResult.class) {
                data.push(flightData);
            }
        } else {
            console.log('Flight not found');
        }

        res.render('../views/displayflights.ejs', { data });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
