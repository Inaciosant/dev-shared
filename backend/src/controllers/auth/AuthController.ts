import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import { generateToken } from '../../utils/auth';

const isProduction = process.env.NODE_ENV === 'production';

const getAuthCookieConfig = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' as const : 'lax' as const,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: '/',
});

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

    const token = generateToken(user.id);
    res.cookie('token', token, getAuthCookieConfig());

    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  }

  // Login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken(user.id);
    res.cookie('token', token, getAuthCookieConfig());

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });

    return res.status(204).send();
  }
}
