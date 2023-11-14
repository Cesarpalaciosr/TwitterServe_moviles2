import { Router } from "express";
import passport from "passport";

import {deleteUser, editpassword, edituser, FindUser} from "../controllers/user.controller";
import {deleteTweet, newTweet, search, showAllTweets, ShowFollowingTweets, showSingleTweet, showUserTweets} from "../controllers/tweet.controller";
import {AddOrRemoveLike, CheckLike, GetLikes} from "../controllers/like.controller";
import {CheckFollow, followorunfollow, GetFollowers, GetFollowing} from "../controllers/follow.controller";
import {DeleteComment, getComments, GetCommentsNumber, NewComment} from "../controllers/comment.controller";


const router = Router();

router.get("/special", passport.authenticate("jwt", { session: false }), (req, res) => {res.send("succes");});

//endpoints para users
router.post("/finduser", passport.authenticate("jwt", { session: false }), FindUser);
router.post("/deleteuser", passport.authenticate("jwt", { session: false }), deleteUser);
router.post("/edituser", passport.authenticate("jwt", { session: false }), edituser);
router.post("/editpass", passport.authenticate("jwt", { session: false }), editpassword);

//endpoints para Tweets
router.post("/newtweet", passport.authenticate("jwt", { session: false }), newTweet);
router.post("/showuserTweets", passport.authenticate("jwt", { session: false }), showUserTweets);
router.post("/showfollowing", passport.authenticate("jwt", { session: false }), ShowFollowingTweets);
router.post("/showalltweets", passport.authenticate("jwt", { session: false }), showAllTweets);
router.post("/showSingleTweet", passport.authenticate("jwt", { session: false }), showSingleTweet);
router.post("/search", passport.authenticate("jwt", { session: false }), search);
router.post("/like", passport.authenticate("jwt", { session: false }), AddOrRemoveLike);
router.post("/getlikes", passport.authenticate("jwt", { session: false }), GetLikes);
router.post("/checklike", passport.authenticate("jwt", { session: false }), CheckLike);
router.post("/deleteTweet", passport.authenticate("jwt", { session: false }), deleteTweet);

//endpoints para followers
router.post("/follow", passport.authenticate("jwt", { session: false }), followorunfollow);
router.post("/getfollowers", passport.authenticate("jwt", { session: false }), GetFollowers);
router.post("/getFollowing", passport.authenticate("jwt", { session: false }), GetFollowing);
router.post("/checkfollow", passport.authenticate("jwt", { session: false }), CheckFollow);

//endpoints para comentarios
router.post("/newComment", passport.authenticate("jwt", { session: false }), NewComment);
router.post("/getcomments", passport.authenticate("jwt", { session: false }), getComments);
router.post("/getnumbercomments", passport.authenticate("jwt", { session: false }), GetCommentsNumber);
router.post("/deletecomment", passport.authenticate("jwt", { session: false }), DeleteComment);

export default router;