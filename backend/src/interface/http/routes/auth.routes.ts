import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { asyncHandler } from '../middlewares/asyncHandler';

const authRouter = Router();

authRouter.post('/login', asyncHandler(AuthController.login));

export default authRouter;
