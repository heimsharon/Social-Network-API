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
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [ /.+@.+\..+/, 'Must match an email address!' ]
  },

  thoughts: [ {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  } ],

  friends: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ],

});

UserSchema.virtual('friendCount').get
  (function () {
    return this.friends.length;
  });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;