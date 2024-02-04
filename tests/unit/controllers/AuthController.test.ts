import { AuthController } from '../../../src/controllers/AuthController';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes do AuthController', () => {
  let authController: AuthController;
  let requisicaoMock: Partial<Request>;
  let respostaMock: Partial<Response>;
  let resposta: any;

  beforeEach(() => {
    authController = new AuthController();
    requisicaoMock = {};
    respostaMock = {
      json: jest.fn().mockImplementation((resultado) => {
        resposta = resultado;
        return respostaMock as Response;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('deve retornar um token JWT quando as credenciais são válidas', async () => {
    requisicaoMock.body = { login: process.env.AUTH_USER, senha: process.env.AUTH_PASSWORD };

    await authController.login(requisicaoMock as Request, respostaMock as Response);

    expect(respostaMock.status).toHaveBeenCalledWith(200);
    expect(resposta).toHaveProperty('token');
  });

  it('deve retornar um status de erro quando as credenciais são inválidas', async () => {
    requisicaoMock.body = { login: 'usuarioInvalido', senha: 'senhaInvalida' };

    await authController.login(requisicaoMock as Request, respostaMock as Response);

    expect(respostaMock.status).toHaveBeenCalledWith(401);
  });

});
