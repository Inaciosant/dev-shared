import { Router } from 'express';
import { UserController } from '../controllers/user/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { imageUpload } from '../middlewares/imageUploadMiddleware';
import { asyncHandler } from './utils';

const userRoutes = Router();
const userController = new UserController();

userRoutes.put('/users/me', authMiddleware, imageUpload.single('avatar'), asyncHandler((req, res) => userController.update(req, res)));
userRoutes.delete('/users/me', authMiddleware, asyncHandler((req, res) => userController.delete(req, res)));

export { userRoutes };
