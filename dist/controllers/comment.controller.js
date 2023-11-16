"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComment = exports.GetCommentsNumber = exports.getComments = exports.NewComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
//Crear Tweet
const NewComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion) {
        return res.status(400).json({ msg: "El Comentario No Puede estar vacio" });
    }
    const newComment = new comment_1.default(req.body);
    yield newComment.save();
    return res.status(201).json(newComment);
});
exports.NewComment = NewComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commnets = yield comment_1.default
        .find({ idTweet: req.body.idTweet })
        .sort({ fecha: "desc" });
    return res.status(201).json(commnets);
});
exports.getComments = getComments;
const GetCommentsNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_1.default.find({ idTweet: req.body.idTweet });
    return res.status(201).json(result.length);
});
exports.GetCommentsNumber = GetCommentsNumber;
const DeleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nota = yield comment_1.default.findOne({ _id: req.body.idTweet });
    if (!nota) {
        return res.status(400).json({ msg: "El Comentario que busco no existe" });
    }
    const notas = yield comment_1.default.deleteOne({ _id: req.body.idTweet });
    console.log(notas);
    return res.status(201).json({ msg: "Comentario eliminado con exito" });
});
exports.DeleteComment = DeleteComment;
