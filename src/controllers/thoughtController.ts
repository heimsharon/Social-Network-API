// Path: src/controllers/thoughtController.ts
// This file contains the controller functions for handling requests related to thoughts and reactions.
import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';
import { Document, Types } from 'mongoose';

// Define the Reaction interface
export interface IReaction {
  reactionBody: string;
  username: string;
  createdAt: Date;
  _id?: Types.ObjectId; // Include `_id` for sub-document methods like `.id()`
}

// Define the Thought interface
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<IReaction>; // Use Mongoose's `DocumentArray` for sub-documents
}

// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
  try {
    // Fetch all thoughts from the database
    const thoughts = await Thought.find();
    // Send the thoughts as a response
    res.status(200).json({ message: 'Thoughts retrieved successfully', data: thoughts });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to fetch thoughts', details: error });
  }
};

// Get a single thought by its _id
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    // Fetch a thought by ID
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      // If thought not found, send a 404 response
      return res.status(404).json({ error: 'Thought not found' });
    }
    // Send the thought data as a response
    res.status(200).json({ message: 'Thought retrieved successfully', data: thought });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to fetch thought', details: error });
  }
};

// POST a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    // Create a new thought and associate it with a user
    const newThought = await Thought.create(req.body);
    // Update the user to include the new thought
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    // Send a 201 response with the created thought
    res.status(201).json(newThought);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to create thought', details: error });
  }
};

// PUT to update a thought by its _id
export const updateThought = async (req: Request, res: Response) => {
  try {
    // Update a thought by ID and send the updated thought as a response
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      // If thought not found, send a 404 response
      return res.status(404).json({ error: 'Thought not found' });
    }
    // Send the updated thought data as a response
    res.status(200).json(updatedThought);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to update thought', details: error });
  }
};

// DELETE to remove thought by its _id
export const deleteThought = async (req: Request, res: Response) => {
  try {
    // Delete a thought by ID and send a success message as a response
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      // If thought not found, send a 404 response
      return res.status(404).json({ error: 'Thought not found' });
    }
    // Send a success message as a response
    res.status(200).json({ message: 'Thought deleted successfully', data: deletedThought });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to delete thought', details: error });
  }
};

// POST a reaction to a thought
export const createReaction = async (req: Request, res: Response) => {
  try {
    // Find the thought and add the reaction
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      // If thought not found, send a 404 response
      return res.status(404).json({ error: 'Thought not found' });
    }
    //
    thought.reactions.push(req.body);
    await thought.save();
    // Send the updated thought as a response
    res.status(201).json(thought);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to create reaction', details: error });
  }
};

// DELETE to pull and remove a reaction by the reaction's reactionId
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    // Find the thought and remove the reaction
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      // If thought not found, send a 404 response
      return res.status(404).json({ error: 'Thought not found' });
    }
    // Send the updated thought as a response
    res.status(200).json({
      message: 'Reaction removed successfully',
      data: thought,
    });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ error: 'Failed to delete reaction', details: error });
  }
};
