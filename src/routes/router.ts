import express from 'express';
import { Response, Request } from 'express';
import image_router from './image-router';
const router = express.Router();

router.use('/api', image_router);

router.use((req: Request, res: Response): void => {
    res.status(404).end('Oops! Page not found');
});

export default router;
