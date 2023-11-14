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
exports.editpassword = exports.edituser = exports.deleteUser = exports.FindUser = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
    }, config_1.default.jwtSecret, 
    //expira en 15 dias
    { expiresIn: 1296000 });
}
//Register
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("soy el signup");
    console.log(req.body);
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Asegurese de ingresar bien su email y contraseña" });
    }
    //Busca coincidencias en la base de datos con el email o username proporcionado
    const user = yield user_1.default.findOne({
        email: req.body.email,
        username: req.body.username,
    });
    console.log(user);
    if (user) {
        return res.status(400).json({ msg: "El usuario ya existe" });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
//Login
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Please. Send your username and password" });
    }
    const user = yield user_1.default.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exist" });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json({
        msg: "Username or password are incorrect",
    });
});
exports.signIn = signIn;
//    ////\\\\
//    \\\\////
const FindUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.body._id });
    console.log(req.body);
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
});
exports.FindUser = FindUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.body._id });
    if (!user) {
        return res.status(400).json({ msg: "el usuario que busco no existe" });
    }
    yield user_1.default.deleteOne({ _id: req.body._id });
    return res.status(201).json({ msg: "Cuenta eliminada con exito" });
});
exports.deleteUser = deleteUser;
const edituser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.updateOne({ _id: req.body._id }, {
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        bio: req.body.bio,
    });
    if (!user) {
        return res.status(400).json({ msg: "Error al intentar editar perfil" });
    }
    return res.status(201).json({ msg: "Guardado con exito" });
});
exports.edituser = edituser;
const editpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.actual || !req.body.newpass) {
        return res.status(400).json({ msg: "Asegurese de ingresar los campos" });
    }
    const user = yield user_1.default.findOne({ _id: req.body._id });
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    const isMatch = yield user.comparePassword(req.body.actual);
    if (!isMatch) {
        //DEVOLVER RESPUETA
        return res.status(400).json({ msg: "La contraseña actual no coincide" });
    }
    if (req.body.actual == req.body.newpass) {
        return res
            .status(400)
            .json({ msg: "la contraseña nueva no puede ser igual que la actual" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(req.body.newpass, salt);
    const pass = yield user_1.default.updateOne({ _id: req.body._id }, { password: hash });
    return res.status(201).json({ msg: "Cambio realizado con exito" });
});
exports.editpassword = editpassword;
