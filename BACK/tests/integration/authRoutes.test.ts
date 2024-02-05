import request from 'supertest';
import app from '../../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes das rotas de autenticação', () => {
  it('deve autenticar com credenciais válidas e retornar um token JWT', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: process.env.AUTH_USER,
        senha: process.env.AUTH_PASSWORD
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('não deve autenticar com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'usuarioInvalido',
        senha: 'senhaInvalida'
      });

    expect(response.status).toBe(401);
  });
});
