import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Comment } from '../../models/Comment';
import { Setup } from '../../models/Setup';

export class CommentController {
  async indexBySetup(req: Request, res: Response) {
    try {
      const { setupId } = req.params;

      if (!isValidObjectId(setupId)) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const setupExists = await Setup.findById(setupId);
      if (!setupExists) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const comments = await Comment.find({ setup: setupId })
        .populate('user', 'name avatar')
        .sort({ createdAt: -1 });

      return res.json(comments);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar comentários.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { setupId } = req.params; 
      const { content, parentComment } = req.body as { content?: string; parentComment?: string | null };
      const userId = req.userId; 

      const trimmedContent = content?.trim();

      if (!trimmedContent || trimmedContent.length < 2 || trimmedContent.length > 500) {
        return res.status(400).json({ error: 'O comentário deve ter entre 2 e 500 caracteres.' });
      }

      const setupExists = await Setup.findById(setupId);
      if (!setupExists) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      let parentCommentId: string | null = null;

      if (parentComment) {
        if (!isValidObjectId(parentComment)) {
          return res.status(400).json({ error: 'Comentário pai inválido.' });
        }

        const parent = await Comment.findById(parentComment);
        if (!parent || parent.setup.toString() !== setupId) {
          return res.status(404).json({ error: 'Comentário pai não encontrado para este setup.' });
        }

        if (parent.parentComment) {
          return res.status(400).json({ error: 'A resposta só pode ser criada para um comentário principal.' });
        }

        parentCommentId = parent._id.toString();
      }

      const comment = await Comment.create({
        user: userId,
        setup: setupId,
        parentComment: parentCommentId,
        content: trimmedContent,
      });

      await comment.populate('user', 'name avatar');

      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao adicionar comentário.' });
    }
  }


  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const userId = req.userId;

      const comment = await Comment.findById(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comentário não encontrado.' });
      }

      if (comment.user.toString() !== userId) {
        return res.status(403).json({ error: 'Não tem permissão para apagar este comentário.' });
      }

      await Comment.deleteMany({ parentComment: comment._id });
      await comment.deleteOne();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao apagar o comentário.' });
    }
  }
}