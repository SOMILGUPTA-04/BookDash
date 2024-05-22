import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/mytrips.ejs');
});

export default router;