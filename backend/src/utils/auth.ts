import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const expiresIn = (process.env.JWT_EXPIRES_IN?.trim() || '7d') as jwt.SignOptions['expiresIn'];
  const secret = process.env.JWT_SECRET ?? 'dev-secret';

  return jwt.sign({ id: userId }, secret, {
    expiresIn
  });
};
