import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { method, params } = req;
  const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

  if (method === 'PUT' || method === 'DELETE') {
    const cardId = params.id || 'Desconhecido';
    const action = method === 'PUT' ? 'Alterado' : 'Removido';
    console.log(`${date} - Card ${cardId} - ${action}`);
  }

  next();
};
