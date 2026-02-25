import { Router } from 'express';
import { CommentController } from '../controllers/comments/CommentsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from './utils';

const commentRoutes = Router();
const commentController = new CommentController();

commentRoutes.post('/setups/:setupId/comments', authMiddleware, asyncHandler((req, res) => commentController.create(req, res)));
commentRoutes.delete('/comments/:id', authMiddleware, asyncHandler((req, res) => commentController.delete(req, res)));

export { commentRoutes };
