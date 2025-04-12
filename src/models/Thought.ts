import mongoose, { Schema, Document,Types } from 'mongoose';
import moment from 'moment';

interface IThought extends Document 
{
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: {
    reactionBody: string;
    username: string;
    createdAt: Date;
  }[];
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
    get: (timestamp: Date) => moment(timestamp).format('MMM Do YYYY [at] h:mm a'),
  } as any,
  
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],//Array of nested documents using ReactionSchema
}, 
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
});

// Virtual property for reaction count
ThoughtSchema.virtual('reactionCount')
  .get(function (this: {reactions: any[]}) {
    return this.reactions.length;
  });

const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);

export default Thought;