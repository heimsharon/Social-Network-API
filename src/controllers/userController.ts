// Path: src/controllers/userController.ts
// This file contains the controller functions for user-related operations.
import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Fetch all users and populate their thoughts and friends
    const users = await User.find().populate('thoughts').populate('friends');
    res.status(200).json(users);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to fetch users', details: error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    // Fetch a user by ID and populate their thoughts and friends
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      // If user not found, send a 404 response
      return res.status(404).json({ error: 'User not found' });
    }
    // Send the user data as a response
    res.status(200).json(user);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};

// POST a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Create a new user and send the created user as a response
    const newUser = await User.create(req.body);
    // Send a 201 response with the created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to create user', details: error });
  }
};

// PUT to update a user by its _id
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Update a user by ID and send the updated user as a response
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      // If user not found, send a 404 response
      return res.status(404).json({ error: 'User not found' });
    }
    // Send the updated user data as a response
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to update user', details: error });
  }
};

// DELETE to remove user by its _id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Delete a user by ID and send a success message as a response
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      // If user not found, send a 404 response
      return res.status(404).json({ error: 'User not found' });
    }
    // Send a success message as a response
    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to delete user', details: error });
  }
};

// POST to add a new friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
  try {
    // Add a friend to a user's friend list and send the updated user as a response
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      // If user not found, send a 404 response
      return res.status(404).json({ error: 'User not found' });
    }
    // Send the updated user data as a response
    res.status(200).json(user);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to add friend', details: error });
  }
};

// DELETE to remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
  try {
    // Remove a friend from a user's friend list and send the updated user as a response
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      // If user not found, send a 404 response
      return res.status(404).json({ error: 'User not found' });
    }
    // Send the updated user data as a response
    res.status(200).json({ message: 'Friend removed successfully', data: user });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to remove friend', details: error });
  }
};

// DELETE to remove user and associated thoughts by its _id
export const deleteUserAndThoughts = async (req: Request, res: Response) => {
  try {
    // Delete a user by ID and send a success message as a response
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      // If user not found, send a 404 response
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete associated thoughts of deleted user
    await Thought.deleteMany({ username: user.username });
    // Send a success message as a response
    res.status(200).json({ message: 'User and associated thoughts deleted successfully', data: user });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to delete user and thoughts', details: error });
  }
};

// Export all functions as a single object
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  deleteUserAndThoughts,
};




