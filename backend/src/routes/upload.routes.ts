import { Router } from 'express';
import { UploadController } from '../controllers/upload/UploadController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { imageUpload } from '../middlewares/imageUploadMiddleware';
import { asyncHandler } from './utils';

const uploadRoutes = Router();
const uploadController = new UploadController();

uploadRoutes.post(
  '/uploads/image',
  authMiddleware,
  imageUpload.single('image'),
  asyncHandler((req, res) => uploadController.image(req, res))
);

export { uploadRoutes };
