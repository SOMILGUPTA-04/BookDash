import express from "express";
import TRAIN from "../models/trains.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/trains.ejs');
});

router.post('/', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body to ensure data is being received correctly

    try {
        const newTrain = await TRAIN.create(req.body);
        res.status(201).json(newTrain); // 201 status code for successful creation
    } catch (err) {
        console.error('Error saving train:', err);
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedTrain = await TRAIN.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(201).json(updatedTrain); // 201 status code for successful updation
    } catch (err) {
        console.error('Error saving train:', err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await TRAIN.findByIdAndUpdate(req.params.id);
        res.status(201).json("TRAIN has been deleted");
    } catch (err) {
        console.error('Error saving train:', err);
        res.status(500).json({ message: err.message });
    }
});
export default router;
