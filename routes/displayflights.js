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
            Class: classChoice.toUpperCase()
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
        const fromCode = fromLocation.match(/\((.*?)\)/)[1];
        const toCode = toLocation.match(/\((.*?)\)/)[1];
        let classCode = classChoice.toLowerCase().charAt(0);
        if(classChoice === "Premium Economy"){
            classCode="w";
        }
        let formattedDepartureDate = departureDate.split('-').reverse().join('');
        let formattedReturnDate = returnDate.split('-').reverse().join('');
        const ixigoUrl = `https://www.ixigo.com/search/result/flight?from=${fromCode}&to=${toCode}&date=${formattedDepartureDate}&returnDate=${formattedReturnDate}&adults=1&children=0&infants=0&class=${classCode}&source=Search%20Form&hbs=true`;

        classCode = classChoice.toUpperCase().charAt(0);
        if(classChoice ==="Premium Economy"){
            classCode="PE";
        }
        // Format dates to dd/mm/yyyy for MakeMyTrip
        formattedDepartureDate = departureDate.split('-').reverse().join('/');
        formattedReturnDate = returnDate.split('-').reverse().join('/');
        const mmtUrl = `https://www.makemytrip.com/flight/search?itinerary=${fromCode}-${toCode}-${formattedDepartureDate}_${toCode}-${fromCode}-${formattedReturnDate}&tripType=R&paxType=A-1_C-0_I-0&intl=false&cabinClass=${classCode}&ccde=IN&lang=eng`;
        res.render('../views/displayflights.ejs', { data });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
