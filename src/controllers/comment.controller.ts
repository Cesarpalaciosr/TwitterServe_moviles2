import { json, Request, Response } from "express";
import comment from "../models/comment";
//Crear Tweet

export const NewComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.descripcion) {
    return res.status(400).json({ msg: "El Comentario No Puede estar vacio" });
  }
  const newComment = new comment(req.body);
  await newComment.save();
  return res.status(201).json(newComment);
};

export const getComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commnets = await comment
    .find({ idTweet: req.body.idTweet })
    .sort({ fecha: "desc" });
  return res.status(201).json(commnets);
};

export const GetCommentsNumber = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await comment.find({ idTweet: req.body.idTweet });
  return res.status(201).json(result.length);
};

export const DeleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const nota = await comment.findOne({ _id: req.body.idTweet });
  if (!nota) {
    return res.status(400).json({ msg: "El Comentario que busco no existe" });
  }

  const notas = await comment.deleteOne({ _id: req.body.idTweet });
  console.log(notas);
  return res.status(201).json({ msg: "Comentario eliminado con exito" });
};
