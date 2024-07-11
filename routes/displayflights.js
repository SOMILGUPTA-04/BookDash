import express from "express";
import Flight from "../models/flight.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { fromfly, tofly, departfly,returnfly, classfly } = req.query;
        console.log(fromfly);
        console.log(tofly);
        console.log(departfly);
        console.log(returnfly);
        console.log(classfly);
        let data = [];

        if (fromfly && tofly && departfly  && returnfly  && classfly === '') {
            const flightData = await Flight.find({ From: fromfly, To: tofly,DepartDate: new Date(departfly),ReturnDate: new Date(returnfly) });
            if (flightData.length > 0) {
                data = flightData;
            } else {
                console.log('Flight not found');
            }
        }
        else{
            const query = {
                From: fromfly,
                To: tofly,
                DepartDate: new Date(departfly),
                ReturnDate: new Date(returnfly),
                Class: classfly.toUpperCase()
            };
            
            
            const flightData = await Flight.findOne(query);
        
            if (flightData) {
                const comparisonResult = {
                    from: flightData.From === fromfly,
                    to: flightData.To === tofly,
                    departDate: new Date(flightData.DepartDate).toISOString().split('T')[0] === departfly,
                    returnDate: new Date(flightData.ReturnDate).toISOString().split('T')[0] === returnfly,
                    class: flightData.Class === classfly.toUpperCase()
                };
                
                if (comparisonResult.from && comparisonResult.to && comparisonResult.departDate && comparisonResult.returnDate && comparisonResult.class) {
                    data.push(flightData);
                }
            } else {
                console.log('Flight not found');
            }
        }
        const fromCode = fromfly.match(/\((.*?)\)/)[1];
        const toCode = tofly.match(/\((.*?)\)/)[1];
        let classCode = classfly.toLowerCase().charAt(0);
        if(classfly === "Premium Economy"){
            classCode="w";
        }
        let formattedDepartureDate = departfly.split('-').reverse().join('');
        let formattedReturnDate = returnfly.split('-').reverse().join('');
        const ixigo = `https://www.ixigo.com/search/result/flight?from=${fromCode}&to=${toCode}&date=${formattedDepartureDate}&returnDate=${formattedReturnDate}&adults=1&children=0&infants=0&class=${classCode}&source=Search%20Form&hbs=true`;

        classCode = classfly.toUpperCase().charAt(0);
        if(classfly ==="Premium Economy"){
            classCode="PE";
        }
        // Format dates to dd/mm/yyyy for MakeMyTrip
        formattedDepartureDate = departfly.split('-').reverse().join('/');
        formattedReturnDate = returnfly.split('-').reverse().join('/');
        const mmt = `https://www.makemytrip.com/flight/search?itinerary=${fromCode}-${toCode}-${formattedDepartureDate}_${toCode}-${fromCode}-${formattedReturnDate}&tripType=R&paxType=A-1_C-0_I-0&intl=false&cabinClass=${classCode}&ccde=IN&lang=eng`;
        res.render('../views/displayflights', { data, mmt, ixigo });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
