import mongoose, { Mongoose } from "mongoose";

mongoose.connect('monogodb://localhost:27017/your_database_name', );

export default mongoose.connection;
