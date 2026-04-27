import express from 'express';
import { registerValidator } from '../validators/auth.validators.js';
import { signup , login , verifyOtp , getMe} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middlewares.js';

const authRouter = express.Router();

authRouter.post('/signup' , registerValidator , signup);
authRouter.post('/login' , login);
authRouter.post('/verify-otp' , verifyOtp);
authRouter.get('/me' , protectRoute , getMe);



export default authRouter;