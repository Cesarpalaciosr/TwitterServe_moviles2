import { json, Request, Response } from "express";
import Like from "../models/like";
//Crear Tweet

export const AddOrRemoveLike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await Like.find({
    idTweet: req.body.idTweet,
    idUser: req.body.idUser,
  });
  console.log(result.length);
  if (result.length == 0) {
    const newLike = new Like(req.body);
    await newLike.save();
    return res.status(201).json({ msg: "Se dio like" });
  }
  await Like.deleteOne({ idTweet: req.body.idTweet, idUser: req.body.idUser });
  return res.status(201).json({ msg: "Se quito like" });
};

export const GetLikes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await Like.find({ idTweet: req.body.idTweet });
  return res.status(201).json(result.length);
};

export const CheckLike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const check = await Like.find({
    idTweet: req.body.idTweet,
    idUser: req.body.idUser,
  });
  console.log(check.length);
  if (check.length == 0) {
    return res.status(201).json({ status: "false" });
  }
  return res.status(201).json({ status: "true" });
};
