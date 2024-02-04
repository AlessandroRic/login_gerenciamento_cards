import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { method, path } = req;
  const date = new Date().toISOString();

  console.log(`${date} - ${method} ${path}`);

  next();
};
