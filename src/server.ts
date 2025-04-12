import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });