import { Request, Response } from "express";
import follow from "../models/follow";

export const followorunfollow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await follow.find({
    idfollowing: req.body.idfollowing,
    idfollower: req.body.idfollower,
  });
  console.log(result.length);
  if (result.length == 0) {
    //GUARDAR Tweet
    const newLike = new follow(req.body);
    await newLike.save();
    return res.status(201).json({ msg: "Ahora sigues a esta persona" });
  }
  await follow.deleteOne({
    idfollowing: req.body.idfollowing,
    idfollower: req.body.idfollower,
  });
  return res.status(201).json({ msg: "Dejaste de seguir a esta persona" });
};

export const GetFollowers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await follow.find({ idfollowing: req.body.idfollowing });
  return res.status(201).json(result.length);
};

export const GetFollowing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await follow.find({ idfollower: req.body.idfollower });
  return res.status(201).json(result.length);
};

export const CheckFollow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const check = await follow.find({
    idfollowing: req.body.idfollowing,
    idfollower: req.body.idfollower,
  });
  console.log(check.length);
  if (check.length == 0) {
    return res.status(201).json({ status: "false" });
  }
  return res.status(201).json({ status: "true" });
};
