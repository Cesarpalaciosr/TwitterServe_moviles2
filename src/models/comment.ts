import mongoose, { Schema, Document, model } from "mongoose";

//INTERFACE
export interface comment extends Document {
  idTweet: string;
  ownername: string;
  owneruser: string;
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  };
  description: string;
  profilePhoto: string;
  date: Date;
}

//EL ESQUEMA DE USUARIO
const commentSchema = new Schema({
  idTweet: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
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
  Photo: {
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

commentSchema.pre<comment>("save", async function (next) {
  next();
});

export default model<comment>("comment", commentSchema);
