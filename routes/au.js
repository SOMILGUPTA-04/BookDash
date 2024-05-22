import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/au.ejs');
});

export default router;