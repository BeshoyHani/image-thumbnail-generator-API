import express from 'express';
import image_router from './image-router';
const router = express.Router();

router.get('/',  (req, res) => {
    res.send("Home Page");
});

router.use('/api', image_router);


export default router;