import express from "express";
import Flight from "../models/flight.js"

const router = express.Router();

router.get('/', async(req,res)=>{
    try {
        const data=await Flight.find();
        res.render('../views/displayflights.ejs',{data});

    }catch(err){
        res.status(500)
    }
});






// Search route
// router.get('/search', async (req, res) => {
//     const { from, to, departure, return: returnDate } = req.query;

//     try {
//         const flights = await Flight.find({
//             from: new RegExp(from, 'i'),
//             to: new RegExp(to, 'i'),
//             departureDate: new Date(departure),
//             ...(returnDate && { returnDate: new Date(returnDate) })
//         });

//         res.render('displayflights', { flights });
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// });

export default router;