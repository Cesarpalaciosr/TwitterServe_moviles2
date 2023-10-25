import { Router } from "express";
import {deleteUser, editpassword, edituser, FindUser} from '../controllers/user.controller'
import {AddtoFolder, deleteNote, editContent, newNote, showDetails, showNotes, shownotesinaFolder } from "../controllers/notes.controller";
import {deleteFolder, newFolder, showFolder } from '../controllers/folder.controller';
import passport, { session } from "passport";

const router = Router();


router.get('/special', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('succes');

})


//endpoints para users
router.post('/finduser',passport.authenticate('jwt', {session: false}),FindUser);
router.post('/deleteuser',passport.authenticate('jwt', {session: false}),deleteUser);
router.post('/edituser', passport.authenticate('jwt', {session:false}),edituser);
router.post('/editpass',passport.authenticate('jwt', {session:false}),editpassword);

//endpoints para notes
router.post('/newnote',passport.authenticate('jwt', {session: false}),newNote);
router.post('/shownotes',passport.authenticate('jwt', {session: false}),showNotes);
router.post('/showdetails',passport.authenticate('jwt', {session: false}),showDetails);
router.post('/edit',passport.authenticate('jwt', {session: false}),editContent);
router.post('/deletenote',passport.authenticate('jwt', {session: false}),deleteNote);
router.post('/addfolder',passport.authenticate('jwt', {session: false}),AddtoFolder);
router.post('/showfolder',passport.authenticate('jwt', {session: false}),shownotesinaFolder);

//endpoints para carpetas
router.post('/newfolder',passport.authenticate('jwt', {session: false}),newFolder);
router.post('/showfolder',passport.authenticate('jwt', {session: false}),showFolder);
router.post('/deletefolder',passport.authenticate('jwt', {session: false}),deleteFolder);


export default router