import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).json({ message: 'Erro no token.' });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ message: 'Token malformatado.' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido no .env');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(401).json({ message: 'Token inválido.' });
      return;
    }
        
    next();
  });
};
