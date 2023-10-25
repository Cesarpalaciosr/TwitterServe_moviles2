import {Request, Response} from 'express';
import User, {IUser} from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import  Notes from "../models/notes";
import bcrypt from 'bcrypt';

function createToken(user:IUser) {
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
    config.jwtSecret,

    //expira en 15 dias
     {expiresIn: 1296000});
}

//Register
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    console.log("soy el signup");
    
    console.log(req.body);
    
    if(!req.body.username || !req.body.email || !req.body.password){
        return res.status(400).json({msg:'Please. Send your email and password'})
    }

    //Busca coincidencias en la base de datos con el email o username proporcionado
    const user = await User.findOne({email: req.body.email, username: req.body.username});
    console.log(user);
    
    if (user) {
        return res.status(400).json({msg:'The user already exist'});
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
}

//Login
export const signIn = async (req: Request, res: Response) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({msg:'Please. Send your username and password'})
    }

    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).json({msg:'The user does not exist'});
    }

    const isMatch = await user.comparePassword(req.body.password)
    if(isMatch){
        return res.status(200).json({token: createToken(user)})
    }
    return res.status(400).json({
        msg:'Username or password are incorrect'
    });
}


//    ////\\\\
//    \\\\////

export const FindUser = async (req: Request,res: Response): Promise<Response> => {
    const user:any = await User.findOne({_id:req.body._id});
    console.log(req.body)
    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
  };

  export const deleteUser = async (req: Request, res: Response): Promise<Response>=>{

    const user = await User.findOne({_id:req.body._id});
    if(!user){
        return res.status(400).json({msg:'el usuario que busco no existe'});
    }

    await User.deleteOne({_id:req.body._id});
    await Notes.deleteMany({owner:req.body.owner});
    return res.status(201).json({msg:"Cuenta eliminada con exito"});

}


export const edituser = async (req:Request, res: Response): Promise<Response>=>{
  const user = await User.updateOne({_id:req.body._id},{name:req.body.name, lastname:req.body.lastname, username:req.body.username});
  if (!user) {
      return res.status(400).json({msg:"Error al intentar editar perfil"});
  }

  return res.status(201).json({msg:"Guardado con exito"});
}


export const editpassword = async (req:Request, res: Response): Promise<Response>=>{

  if (!req.body.actual || !req.body.newpass) {
    return res.status(400).json({ msg: "Asegurese de ingresar los campos" });
  }

  const user = await User.findOne({_id:req.body._id});
  if (!user) {

    return res.status(400).json({ msg: "El usuario no existe" });
  }

  const isMatch = await user.comparePassword(req.body.actual);
  if (!isMatch) {
   //DEVOLVER RESPUETA
    return res.status(400).json({msg: "La contraseña actual no coincide"});
  }

  if (req.body.actual==req.body.newpass) {
    return res.status(400).json({msg: "la contraseña nueva no puede ser igual que la actual"})
  }
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.newpass,salt);

  const pass = await User.updateOne({_id:req.body._id},{password:hash});

  return res.status(201).json({msg:"Cambio realizado con exito"});
}