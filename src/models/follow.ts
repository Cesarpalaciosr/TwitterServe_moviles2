import { Schema, Document, model } from "mongoose";

//INTERFACE
export interface Follow extends Document {
  idFollowing: string;
  idFollower: string;
}

//EL ESQUEMA DE USUARIO
const FollowSchema = new Schema({
  idFollowing: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  idFollower: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
});

FollowSchema.pre<Follow>("save", async function (next) {
  next();
});

export default model<Follow>("Follow", FollowSchema);
