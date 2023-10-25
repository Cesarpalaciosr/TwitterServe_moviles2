"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const notes_controller_1 = require("../controllers/notes.controller");
const folder_controller_1 = require("../controllers/folder.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/special', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.send('succes');
});
//endpoints para users
router.post('/finduser', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.FindUser);
router.post('/deleteuser', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.deleteUser);
router.post('/edituser', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.edituser);
router.post('/editpass', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.editpassword);
//endpoints para notes
router.post('/newnote', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.newNote);
router.post('/shownotes', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.showNotes);
router.post('/showdetails', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.showDetails);
router.post('/edit', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.editContent);
router.post('/deletenote', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.deleteNote);
router.post('/addfolder', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.AddtoFolder);
router.post('/showfolder', passport_1.default.authenticate('jwt', { session: false }), notes_controller_1.shownotesinaFolder);
//endpoints para carpetas
router.post('/newfolder', passport_1.default.authenticate('jwt', { session: false }), folder_controller_1.newFolder);
router.post('/showfolder', passport_1.default.authenticate('jwt', { session: false }), folder_controller_1.showFolder);
router.post('/deletefolder', passport_1.default.authenticate('jwt', { session: false }), folder_controller_1.deleteFolder);
exports.default = router;
