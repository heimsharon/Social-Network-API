// Path: src/routes/api/userRoutes.ts
// This file defines the routes for user-related operations.
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  deleteUserAndThoughts,
} from '../../controllers/userController';

// Create a new router instance
const router = Router();

// GET all users
router.get("/", getAllUsers);

// GET a single user by its _id
router.get("/:id", getUserById);

// POST a new user
router.post("/", createUser);

// PUT to update a user by its _id
router.put("/:id", updateUser);

// DELETE to remove user by its _id
router.delete("/:id", deleteUser);

// POST to add a friend to a user
router.post('/:userId/friends/:friendId', addFriend);

// DELETE to remove a friend from a user
router.delete('/:userId/friends/:friendId', removeFriend);

// DELETE to remove a user and their thoughts by its _id
router.delete('/:id', deleteUserAndThoughts);

export default router;

