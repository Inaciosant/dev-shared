import { Request, Response } from 'express';
import { Comment } from '../../models/Comment';
import { Setup } from '../../models/Setup';

export class CommentController {
  

  async create(req: Request, res: Response) {
    try {
      const { setupId } = req.params; 
      const { content } = req.body;
      const userId = req.userId; 

      const setupExists = await Setup.findById(setupId);
      if (!setupExists) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const comment = await Comment.create({
        user: userId,
        setup: setupId,
        content
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

      await comment.deleteOne();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao apagar o comentário.' });
    }
  }
}