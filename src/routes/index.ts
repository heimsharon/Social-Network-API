import express from 'express';
const router = express.Router();
import itemRoutes from './itemRoutes';

router.use('/items', itemRoutes);

export default router;