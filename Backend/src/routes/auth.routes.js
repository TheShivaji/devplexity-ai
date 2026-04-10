import express from 'express';
import { registerValidator } from '../validators/auth.validators.js';
import { signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/Signup' , registerValidator , signup);



export default authRouter;