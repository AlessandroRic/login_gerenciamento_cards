import { Request, Response, NextFunction } from 'express';
import { loggingMiddleware } from '../../../src/middleware/loggingMiddleware';

describe('loggingMiddleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  it('Deve apresentar um log quando o card for atualizado', () => {
    req.method = 'PUT';
    req.params = { id: '123' };

    const consoleSpy = jest.spyOn(console, 'log');

    loggingMiddleware(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Card 123 - Alterado'));
    expect(next).toHaveBeenCalled();
  });

  it('Deve apresentar um log quando o card for deletado', () => {
    req.method = 'DELETE';
    req.params = { id: '456' };

    const consoleSpy = jest.spyOn(console, 'log');

    loggingMiddleware(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Card 456 - Removido'));
    expect(next).toHaveBeenCalled();
  });

});