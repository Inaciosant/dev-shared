import { Router } from 'express';
import { SetupController } from '../controllers/setup/SetupController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { imageUpload } from '../middlewares/imageUploadMiddleware';
import { asyncHandler } from './utils';

const setupRoutes = Router();
const setupController = new SetupController();

setupRoutes.get('/', asyncHandler((req, res) => setupController.index(req, res)));
setupRoutes.get('/:id', asyncHandler((req, res) => setupController.show(req, res)));
setupRoutes.post('/', authMiddleware, imageUpload.single('thumbnail'), asyncHandler((req, res) => setupController.create(req, res)));
setupRoutes.put('/:id', authMiddleware, imageUpload.single('thumbnail'), asyncHandler((req, res) => setupController.update(req, res)));
setupRoutes.delete('/:id', authMiddleware, asyncHandler((req, res) => setupController.delete(req, res)));

export { setupRoutes };
