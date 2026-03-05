import { Router } from 'express';
import { AuthController } from '../controllers/auth/AuthController';
import { asyncHandler } from './utils';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', asyncHandler((req, res) => authController.register(req, res)));
authRoutes.post('/login', asyncHandler((req, res) => authController.login(req, res)));
authRoutes.post('/logout', asyncHandler((req, res) => authController.logout(req, res)));

export { authRoutes };
