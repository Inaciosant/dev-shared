import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { User } from '../../models/User';
import { Setup } from '../../models/Setup';
import { Comment } from '../../models/Comment';
import * as bcrypt from 'bcryptjs';
import { uploadImageToCloudinary } from '../../services/cloudinary/uploadImage';

export class UserController {
  async me(req: Request, res: Response) {
    const userId = req.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(user);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = await User.findById(id).select('_id name avatar bio githubUrl createdAt updatedAt');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const postsCount = await Setup.countDocuments({ user: id });

    return res.json({
      user,
      stats: { postsCount },
    });
  }

  async setupsByUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const userExists = await User.exists({ _id: id });
    if (!userExists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const setups = await Setup.find({ user: id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    return res.json(setups);
  }

  async update(req: Request, res: Response) {
    const { name, bio, avatar, githubUrl, password } = req.body;
    const userId = req.userId; 

    const updateData: any = { name, bio, avatar, githubUrl };

    if (req.file) {
      const upload = await uploadImageToCloudinary(req.file.buffer, 'avatars');
      updateData.avatar = upload.secure_url;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const userId = req.userId;

    try {
      await Setup.deleteMany({ user: userId }); 
      await Comment.deleteMany({ user: userId }); 
      await User.findByIdAndDelete(userId);
      return res.status(204).send(); 
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar conta' });
    }
  }
}
