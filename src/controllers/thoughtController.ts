import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';
import { Document, Types } from 'mongoose';

export interface IReaction {
  reactionBody: string;
  username: string;
  createdAt: Date;
  _id?: Types.ObjectId; // Include `_id` for subdocument methods like `.id()`
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<IReaction>; // Use Mongoose's `DocumentArray` for subdocuments
}

// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json({ message: 'Thoughts retrieved successfully', data: thoughts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thoughts', details: error });
  }
};

// Get a single thought by its _id
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.status(200).json({ message: 'Thought retrieved successfully', data: thought });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thought', details: error });
  }
};

// POST a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create thought', details: error });
  }
};

// PUT to update a thought by its _id
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update thought', details: error });
  }
};

// DELETE to remove thought by its _id
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.status(200).json({ message: 'Thought deleted successfully', data: deletedThought });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete thought', details: error });
  }
};

// POST a reaction to a thought
export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reaction', details: error });
  }
};

// DELETE to pull and remove a reaction by the reaction's reactionId value
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.status(200).json({ message: 'Reaction deleted successfully', data: thought });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reaction', details: error });
  }
};
