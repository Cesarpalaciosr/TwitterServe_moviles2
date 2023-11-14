import mongoose, { Schema, Document, model } from "mongoose";

//INTERFACE
export interface Tweet extends Document {
  ownername: string;
  owneruser: string;
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  description: string;
  photo: string;
  profilePhoto: string;
  date: Date;
}

//EL ESQUEMA DE USUARIO
const TweetSchema = new Schema({
  ownername: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  owneruser: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    unique: false,
    required: false,
    trim: true,
  },
  photo: {
    type: String,
    unique: false,
    required: false,
    trim: true,
  },
  profilePhoto: {
    type: String,
    unique: false,
    required: false,
    trim: true,
  },
  date: Date,
});

TweetSchema.index({ "$**": "text" });

TweetSchema.pre<Tweet>("save", async function (next) {
  next();
});

export default model<Tweet>("Tweet", TweetSchema);
