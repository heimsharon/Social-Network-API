import mongoose, { Schema, Document, Types } from 'mongoose';
import moment from 'moment';

export interface IReaction {
  reactionBody: string;
  username: string;
  createdAt: Date;
  _id?: Types.ObjectId;
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<IReaction>; // DocumentArray for sub-documents
}

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => moment(timestamp).format('MMM Do YYYY [at] h:mm a') as any,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema], // Array of nested documents using ReactionSchema
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function (this: { reactions: Types.DocumentArray<IReaction> }) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);

export default Thought;