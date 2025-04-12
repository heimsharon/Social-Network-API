import express from 'express';
import usersRoutes from './api/userRoutes';
import thoughtsRoutes from './api/thoughtRoutes';

const router = express.Router();

router.use('/api/users', usersRoutes);
router.use('/api/thoughts', thoughtsRoutes);

export default router;
