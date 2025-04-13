// Path: src/config/connections.ts
// This file is used to connect to the database

import mongoose, { Mongoose } from "mongoose";
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', );

export default mongoose.connection;
