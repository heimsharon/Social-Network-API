// Path: src/utils/seed.ts
// This file is used to seed the database with initial data.
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Thought from '../models/Thought';
import { users, thoughts } from './data'; // Import seed data

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Cleared existing data');

    // Seed users
    const seededUsers = await User.insertMany(users);
    console.log('Seeded users:', seededUsers);

    // Seed thoughts
    const seededThoughts = await Thought.insertMany(thoughts);
    console.log('Seeded thoughts:', seededThoughts);

    // Associate thoughts with users
    await User.findOneAndUpdate(
      { username: 'john_doe' },
      { $push: { thoughts: seededThoughts[0]._id } }
    );
    await User.findOneAndUpdate(
      { username: 'jane_doe' },
      { $push: { thoughts: seededThoughts[1]._id } }
    );

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();