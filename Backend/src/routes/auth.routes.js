import express from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validators.js';
import { signup , login , verifyOtp , getMe} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middlewares.js';

const authRouter = express.Router();

authRouter.post('/signup' , registerValidator ,  registerValidator,signup);
authRouter.post('/login' , loginValidator ,   login);
authRouter.post('/verify-otp' , verifyOtp);
authRouter.get('/get-me' , protectRoute , getMe);



export default authRouter;