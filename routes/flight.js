import express from "express";
import Flight from "../models/flight.js"

const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('../views/flights.ejs');
// });

router.get('/', async(req,res)=>{
    try {
        const data=await Flight.find();
        const uniqueFromValues = [...new Set(data.map(doc => doc.From))].sort();
        const uniqueToValues = [...new Set(data.map(doc => doc.To))].sort();
        res.render('../views/flights.ejs',{uniqueFromValues,uniqueToValues});

    }catch(err){
        res.status(500)
    }
});

router.post('/', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body to ensure data is being received correctly

    try {
        const newFlight = await Flight.create(req.body);
        res.status(201).json(newFlight); // 201 status code for successful creation
    } catch (err) {
        console.error('Error saving flight:', err);
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(201).json(updatedFlight); // 201 status code for successful updation
    } catch (err) {
        console.error('Error saving flight:', err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Flight.findByIdAndUpdate(req.params.id);
        res.status(201).json("Flight has been deleted");
    } catch (err) {
        console.error('Error saving flight:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;