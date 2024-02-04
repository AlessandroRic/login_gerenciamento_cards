import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../../src/middleware/authMiddleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes do authMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('deve chamar next() quando as credenciais são válidas', () => {
    const validToken = jwt.sign({ user: process.env.AUTH_USER }, process.env.JWT_SECRET as string);
    mockRequest = {
      headers: {
        authorization: `Bearer ${validToken}`
      }
    };

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
  });

  it('deve retornar status 401 para um token JWT inválido', () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer tokenInvalido'
      }
    };

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: 'Token inválido ou não fornecido' });
  });

  it('deve retornar status 401 se não houver token', () => {
    mockRequest = {
      headers: {}
    };

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: 'Token inválido ou não fornecido' });
  });

});
