import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user) throw ({code: 11000, message: "El email ya existe"});

        user = new User({email, password});
        await user.save();
        return res.status(201).json({message: "Usuario creado correctamente"});
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({message: "El email ya existe"});
        }
        return res.status(500).json({error: "Error en el servidor"});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(!user) return res.status(403).json({message: "El usuario no existe"});
        const resPassword = await user.comparePassword(password);
        if(!resPassword) return res.status(403).json({message: "La contraseña es incorrecta"});
        const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET, {expiresIn: "6h"});
        return res.json({token: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error en el servidor"});
    }
}