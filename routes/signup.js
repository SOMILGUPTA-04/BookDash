import express from "express";
const router = express.Router();
import Signup from "../models/signup.js";

 
router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    const { UserName, Email, Password } = req.body;
    try {
        await Signup.create({
            UserName,
            Email,
            Password,
        });
        res.status(201).send("Signup successful!");
    } catch (error) {
        res.status(500).send("Try Again After Some Time!");
    }
});

export default router;
