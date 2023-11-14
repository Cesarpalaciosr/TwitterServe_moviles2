"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = require("../controllers/user.controller");
const tweet_controller_1 = require("../controllers/tweet.controller");
const like_controller_1 = require("../controllers/like.controller");
const follow_controller_1 = require("../controllers/follow.controller");
const comment_controller_1 = require("../controllers/comment.controller");
const router = (0, express_1.Router)();
router.get("/special", passport_1.default.authenticate("jwt", { session: false }), (req, res) => { res.send("succes"); });
//endpoints para users
router.post("/finduser", passport_1.default.authenticate("jwt", { session: false }), user_controller_1.FindUser);
router.post("/deleteuser", passport_1.default.authenticate("jwt", { session: false }), user_controller_1.deleteUser);
router.post("/edituser", passport_1.default.authenticate("jwt", { session: false }), user_controller_1.edituser);
router.post("/editpass", passport_1.default.authenticate("jwt", { session: false }), user_controller_1.editpassword);
//endpoints para Tweets
router.post("/newtweet", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.newTweet);
router.post("/showuserTweets", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.showUserTweets);
router.post("/showfollowing", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.ShowFollowingTweets);
router.post("/showalltweets", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.showAllTweets);
router.post("/showSingleTweet", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.showSingleTweet);
router.post("/search", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.search);
router.post("/like", passport_1.default.authenticate("jwt", { session: false }), like_controller_1.AddOrRemoveLike);
router.post("/getlikes", passport_1.default.authenticate("jwt", { session: false }), like_controller_1.GetLikes);
router.post("/checklike", passport_1.default.authenticate("jwt", { session: false }), like_controller_1.CheckLike);
router.post("/deleteTweet", passport_1.default.authenticate("jwt", { session: false }), tweet_controller_1.deleteTweet);
//endpoints para followers
router.post("/follow", passport_1.default.authenticate("jwt", { session: false }), follow_controller_1.followorunfollow);
router.post("/getfollowers", passport_1.default.authenticate("jwt", { session: false }), follow_controller_1.GetFollowers);
router.post("/getFollowing", passport_1.default.authenticate("jwt", { session: false }), follow_controller_1.GetFollowing);
router.post("/checkfollow", passport_1.default.authenticate("jwt", { session: false }), follow_controller_1.CheckFollow);
//endpoints para comentarios
router.post("/newComment", passport_1.default.authenticate("jwt", { session: false }), comment_controller_1.NewComment);
router.post("/getcomments", passport_1.default.authenticate("jwt", { session: false }), comment_controller_1.getComments);
router.post("/getnumbercomments", passport_1.default.authenticate("jwt", { session: false }), comment_controller_1.GetCommentsNumber);
router.post("/deletecomment", passport_1.default.authenticate("jwt", { session: false }), comment_controller_1.DeleteComment);
exports.default = router;
