import {Request, Response } from "express";
import Tweet from "../models/tweet";
import Follow from "../models/follow";

//Crear Tweet
export const newTweet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.description && req.body.photo == "undefined") {
    return res.status(400).json({ msg: "El Tweet No puede estar Vacio" });
  }
  //GUARDAR Tweet
  const newTweet = new Tweet(req.body);
  await newTweet.save();
  return res.status(201).json(newTweet);
};

export const showUserTweets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Tweets = await Tweet.find({ owner: req.body.owner }).sort({
    date: "desc",
  });
  if (!Tweets) {
    return res.status(400).json({ msg: "el usuario no tiene Tweets" });
  }
  console.log(Tweets);
  return res.status(201).json({ Tweets });
};

export const showSingleTweet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Tweets = await Tweet.findOne({ _id: req.body.idTweet });
  if (!Tweets) {
    return res.status(400).json({ msg: "El Tweet que busco no existe" });
  }
  console.log(Tweets);
  return res.status(201).json({ Tweets });
};

export const search = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Tweets = await Tweet.find({ $text: { $search: req.body.description } });
  if (!Tweets) {
    return res.status(400).json({ msg: "El Tweet que busco no existe" });
  }
  console.log(Tweets);
  return res.status(201).json({ Tweets });
};

export const ShowFollowingTweets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tweetSearch = await Follow.find({ idFollower: req.body.userid });

  let result: any = [];

  for (let i = 0; i < tweetSearch.length; i++) {
    const tweets = await Tweet.find({ owner: tweetSearch[i].idFollowing });

    result = result.concat(tweets);
  }
  let allTweets = result.sort(function (a: any, b: any) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return res.status(200).json({ allTweets });
};

export const showAllTweets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Tweets = await Tweet.find().sort({ date: "desc" });
  if (!Tweets) {
    return res.status(400).json({ msg: "el usuario no tiene Tweets" });
  }
  console.log(Tweets);
  return res.status(201).json({ Tweets });
};

export const showTweetDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const coincidenceTweet = await Tweet.findOne({ _id: req.body._id });
  if (!coincidenceTweet) {
    return res
      .status(400)
      .json({ msg: "La coincidenceTweet que busco no existe" });
  }
  //GUARDAR USUARIO
  return res.status(201).json(coincidenceTweet);
};

export const editTweetContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updateTweet = await Tweet.updateOne(
    { _id: req.body._id },
    { description: req.body.description }
  );
  if (!updateTweet) {
    return res
      .status(400)
      .json({
        msg: "Error al intentar guardar el tweet (coincidenceTweet no encontrada)",
      });
  }
  console.log(updateTweet);
  return res.status(201).json({ msg: "Guardado con exito" });
};

export const deleteTweet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const coincidenceTweet = await Tweet.findOne({ _id: req.body.idTweet });
  if (!coincidenceTweet) {
    return res.status(400).json({ msg: "El Tweet que busco no existe" });
  }

  const updateTweet = await Tweet.deleteOne({ _id: req.body.idTweet });
  console.log(updateTweet);
  return res.status(201).json({ msg: "Tweet eliminado con exito" });
};
