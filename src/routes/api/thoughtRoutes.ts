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