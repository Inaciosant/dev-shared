import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { commentRoutes } from './comment.routes';
import { setupRoutes } from './setup.routes';
import { uploadRoutes } from './upload.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/setups', setupRoutes);
router.use(commentRoutes);
router.use(uploadRoutes);
router.use(userRoutes);

export { router };
