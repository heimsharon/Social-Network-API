// Path: src/routes/api/thoughtRoutes.ts
// This file defines the routes for the Thought model
import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} from '../../controllers/thoughtController';

// Create a new router instance
const router = Router();

// Thought routes
router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);

// Reaction routes
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export default router;