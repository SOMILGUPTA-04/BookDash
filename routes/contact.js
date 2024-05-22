import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/contact.ejs');
});

export default router;