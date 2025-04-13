// Path: src/server.ts
// This is the main server file for the social network application.
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use('/', routes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB')
  .then(() => {
    // Start the server after successful connection
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      // Server is running
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    // Handle connection error
    console.error('MongoDB connection error:', err);
  });