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
exports.deleteFolder = exports.showFolder = exports.newFolder = void 0;
const folder_1 = __importDefault(require("../models/folder"));
const notes_1 = __importDefault(require("../models/notes"));
//Crear coleccion
const newFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Guardar coleccion
    const newfolder = new folder_1.default(req.body);
    yield newfolder.save();
    return res.status(201).json(newfolder);
});
exports.newFolder = newFolder;
const showFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_1.default.find({ owner: req.body.owner });
    if (!folder) {
        return res.status(400).json({ msg: "el usuario no existe" });
    }
    return res.status(201).json(folder);
});
exports.showFolder = showFolder;
const deleteFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_1.default.findOne({ name_folder: req.body.name_folder });
    if (!folder) {
        return res.status(400).json({ msg: "la carpeta que busco no existe" });
    }
    yield notes_1.default.updateMany({ folder: req.body.name_folder }, { folder: " " });
    yield folder.deleteOne({ name_folder: req.body.name_folder });
    return res.status(200).json({ msg: "La carpeta fue borrada con exito" });
});
exports.deleteFolder = deleteFolder;
