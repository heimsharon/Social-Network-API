import mongoose, { Mongoose } from "mongoose";

mongoose.connect('monogodb://localhost:27017/monorepo');

export default mongoose.connection;
