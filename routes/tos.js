import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/tos.ejs');
});

export default router;