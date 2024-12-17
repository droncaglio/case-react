import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const classRouter = Router();

// Rota protegida para listar classes
classRouter.get(
  '/',
  asyncHandler(ensureAuthenticated),
  asyncHandler(ClassController.list)
);

export default classRouter;
