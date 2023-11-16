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
exports.deleteTweet = exports.editTweetContent = exports.showTweetDetails = exports.showAllTweets = exports.ShowFollowingTweets = exports.search = exports.showSingleTweet = exports.showUserTweets = exports.newTweet = void 0;
const tweet_1 = __importDefault(require("../models/tweet"));
const follow_1 = __importDefault(require("../models/follow"));
//Crear Tweet
const newTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.description && req.body.photo == "undefined") {
        return res.status(400).json({ msg: "El Tweet No puede estar Vacio" });
    }
    //GUARDAR Tweet
    const newTweet = new tweet_1.default(req.body);
    yield newTweet.save();
    return res.status(201).json(newTweet);
});
exports.newTweet = newTweet;
const showUserTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.find({ owner: req.body.owner }).sort({
        date: "desc",
    });
    if (!Tweets) {
        return res.status(400).json({ msg: "el usuario no tiene Tweets" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.showUserTweets = showUserTweets;
const showSingleTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.findOne({ _id: req.body.idTweet });
    if (!Tweets) {
        return res.status(400).json({ msg: "El Tweet que busco no existe" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.showSingleTweet = showSingleTweet;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.find({ $text: { $search: req.body.description } });
    if (!Tweets) {
        return res.status(400).json({ msg: "El Tweet que busco no existe" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.search = search;
const ShowFollowingTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetSearch = yield follow_1.default.find({ idFollower: req.body.userid });
    let result = [];
    for (let i = 0; i < tweetSearch.length; i++) {
        const tweets = yield tweet_1.default.find({ owner: tweetSearch[i].idFollowing });
        result = result.concat(tweets);
    }
    let allTweets = result.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return res.status(200).json({ allTweets });
});
exports.ShowFollowingTweets = ShowFollowingTweets;
const showAllTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.find().sort({ date: "desc" });
    if (!Tweets) {
        return res.status(400).json({ msg: "el usuario no tiene Tweets" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.showAllTweets = showAllTweets;
const showTweetDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coincidenceTweet = yield tweet_1.default.findOne({ _id: req.body._id });
    if (!coincidenceTweet) {
        return res
            .status(400)
            .json({ msg: "La coincidenceTweet que busco no existe" });
    }
    //GUARDAR USUARIO
    return res.status(201).json(coincidenceTweet);
});
exports.showTweetDetails = showTweetDetails;
const editTweetContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateTweet = yield tweet_1.default.updateOne({ _id: req.body._id }, { description: req.body.description });
    if (!updateTweet) {
        return res
            .status(400)
            .json({
            msg: "Error al intentar guardar el tweet (coincidenceTweet no encontrada)",
        });
    }
    console.log(updateTweet);
    return res.status(201).json({ msg: "Guardado con exito" });
});
exports.editTweetContent = editTweetContent;
const deleteTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coincidenceTweet = yield tweet_1.default.findOne({ _id: req.body.idTweet });
    if (!coincidenceTweet) {
        return res.status(400).json({ msg: "El Tweet que busco no existe" });
    }
    const updateTweet = yield tweet_1.default.deleteOne({ _id: req.body.idTweet });
    console.log(updateTweet);
    return res.status(201).json({ msg: "Tweet eliminado con exito" });
});
exports.deleteTweet = deleteTweet;
