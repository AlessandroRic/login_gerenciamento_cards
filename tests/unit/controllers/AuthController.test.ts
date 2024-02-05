import { AuthController } from '../../../src/controllers/AuthController';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes do AuthController', () => {
  let authController: AuthController;
  let requisicaoMock: Partial<Request>;
  let respostaMock: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    authController = new AuthController();
    requisicaoMock = {
      body: {
        login: process.env.AUTH_USER,
        senha: process.env.AUTH_PASSWORD
      }
    };

    respostaMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    nextFunction = jest.fn();
  });

  it('deve retornar um token JWT quando as credenciais são válidas', async () => {
    await authController.login(requisicaoMock as Request, respostaMock as Response);
  
    expect(respostaMock.status).toHaveBeenCalledWith(200);
    expect(respostaMock.json).toHaveBeenCalled(); 
  });

  it('deve retornar um status de erro quando as credenciais são inválidas', async () => {
    requisicaoMock.body = { login: 'usuarioInvalido', senha: 'senhaInvalida' };

    authController.login(requisicaoMock as Request, respostaMock as Response);

    expect(respostaMock.status).toHaveBeenCalledWith(401);
  });

});
