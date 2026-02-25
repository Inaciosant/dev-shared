import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import { generateToken } from '../../utils/auth';

export class AuthController {
  // Registro de novo usuário
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Usuário já existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token: generateToken(user.id)
    });
  }

  // Login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: generateToken(user.id)
    });
  }
}
