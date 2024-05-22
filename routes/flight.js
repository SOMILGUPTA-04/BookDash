import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/flights.ejs');
});

export default router;