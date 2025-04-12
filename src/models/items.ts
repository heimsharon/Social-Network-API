import mongoose, { Schema, Document } from 'mongoose';

interface Item extends Document {
  name: string;
  description: string;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<Item>("Item", ItemSchema);