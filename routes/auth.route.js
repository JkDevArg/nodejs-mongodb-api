import express from 'express';
import { login, register } from "../controllers/auth.controller.js";
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
const router = express.Router();

router.post(
    '/register', 
    [
    body('email', 'Formato de Email incorrecta')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'La contraseña debe tener al menos 6 caracteres').trim().isLength({ min: 6 }),
    body('password', 'Formato de Password incorrecta')
        .isAlphanumeric()
        .custom((value, {req}) => {
            if(value !== req.body.repassword){
                throw new Error('Las contraseñas no coinciden');
            }
            return value;
        })
    ],
    validationResultExpress,
    register
);
router.post(
    '/login',
    [
        body('email', 'Formato de Email incorrecta')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'La contraseña debe tener al menos 6 caracteres').trim().isLength({ min: 6 }),
    ],
    validationResultExpress,
    login
);

export default router;