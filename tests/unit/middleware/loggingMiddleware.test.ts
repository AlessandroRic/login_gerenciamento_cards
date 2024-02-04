import { Request, Response, NextFunction } from 'express';
import { loggingMiddleware } from '../../../src/middleware/loggingMiddleware';

describe('Testes do loggingMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();
  const originalConsoleLog = console.log;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it('deve registrar informações no console para requisições de alteração', () => {
    mockRequest.method = 'PUT';
    mockRequest.url = '/cards/1';
    mockRequest.body = { titulo: 'Card Atualizado', conteudo: 'Conteúdo atualizado', lista: 'Lista 2' };

    loggingMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Card 1 - Card Atualizado - Alterar'));
    expect(nextFunction).toHaveBeenCalled();
  });

  it('deve registrar informações no console para requisições de remoção', () => {
    mockRequest.method = 'DELETE';
    mockRequest.url = '/cards/1';

    loggingMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Card 1 - Removido'));
    expect(nextFunction).toHaveBeenCalled();
  });

});
