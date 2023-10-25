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
exports.shownotesinaFolder = exports.AddtoFolder = exports.deleteNote = exports.editContent = exports.showDetails = exports.showNotes = exports.newNote = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const folder_1 = __importDefault(require("../models/folder"));
//Crear Nota
const newNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //GUARDAR Nota
    const newnote = new notes_1.default(req.body);
    yield newnote.save();
    return res.status(201).json(newnote);
});
exports.newNote = newNote;
const showNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.default.find({ owner: req.body.owner });
    if (!notes) {
        return res.status(400).json({ msg: "el usuario no tiene notas" });
    }
    console.log(notes);
    return res.status(201).json(notes);
});
exports.showNotes = showNotes;
const showDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_1.default.findOne({ _id: req.body._id });
    if (!note) {
        return res.status(400).json({ msg: 'La nota que busco no existe' });
    }
    //GUARDAR USUARIO
    return res.status(201).json(note);
});
exports.showDetails = showDetails;
const editContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.default.updateOne({ _id: req.body._id }, { tittle: req.body.tittle, description: req.body.description });
    if (!notes) {
        return res.status(400).json({ msg: "Error al intentar guardar la note (note no encontrada)" });
    }
    console.log(notes);
    return res.status(201).json({ msg: "Guardado con exito" });
});
exports.editContent = editContent;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_1.default.findOne({ _id: req.body._id });
    if (!note) {
        return res.status(400).json({ msg: 'La nota que busco no existe' });
    }
    const notes = yield notes_1.default.deleteOne({ _id: req.body._id });
    console.log(notes);
    return res.status(201).json({ msg: "Nota eliminada con exito" });
});
exports.deleteNote = deleteNote;
const AddtoFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_1.default.findOne({ name_folder: req.body.name_folder });
    if (!folder) {
        return res.status(400).json({ msg: "la carpeta que ingreso no existe" });
    }
    yield notes_1.default.updateOne({ _id: req.body.idnote }, { folder: req.body.name_folder });
    return res.status(201).json({ msg: "nota agregada con exito" });
});
exports.AddtoFolder = AddtoFolder;
const shownotesinaFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.default.find({ name_folder: req.body.name_folder });
    if (!notes) {
        return res.status(400).json({ msg: "La caroeta que busco no existe" });
    }
    console.log(notes);
    return res.status(201).json(notes);
});
exports.shownotesinaFolder = shownotesinaFolder;
