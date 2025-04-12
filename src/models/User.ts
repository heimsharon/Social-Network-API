import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: string[];
  friends: string[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [ /^\S+@\S+\.\S+$/, 'Must match a valid email address!' ],
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  });

// Virtual property for friend count
UserSchema.virtual('friendCount')
  .get(function (this: IUser) {
    return this.friends.length;
  });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;