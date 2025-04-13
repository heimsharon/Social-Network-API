// Path: src/routes/index.ts
// This file is used to define the routes for the application.
import express from 'express';
import usersRoutes from './api/userRoutes';
import thoughtsRoutes from './api/thoughtRoutes';

// Create a new router instance
const router = express.Router();

// Use the user and thought routes
router.use('/api/users', usersRoutes);
router.use('/api/thoughts', thoughtsRoutes);

export default router;
