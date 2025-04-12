import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

interface IThought {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: {
    reactionBody: string;
    username: string;
    createdAt: Date;
  }[];
}

const ReactionSchema = new Schema({
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
    get: function (timestamp: any): string {
      return timestamp ? moment(timestamp).format('MMM DD, YYYY [at] hh:mm a') : '';
    },
  } as any, // Explicitly cast to `any`
});

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
      get: function (timestamp: any): string {
        return timestamp ? moment(timestamp).format('MMM DD, YYYY [at] hh:mm a') : '';
      },
    } as any, // Explicitly cast to `any`
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema], // Use ReactionSchema as a subdocument
  },
  {
    toJSON: {
      getters: true, // Enable getters
    },
    id: false, // Disable the virtual `id` field
  }
);

ThoughtSchema.virtual('reactionCount').get(function (this: { reactions: any[] }) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);

export default Thought;