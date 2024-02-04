import request from 'supertest';
import app from '../../src/app';

describe('Testes das rotas de card', () => {
  it('deve criar um novo card', async () => {
    const cardData = { titulo: 'Novo Card', conteudo: 'Conteúdo do card', lista: 'Lista 1' };
    const response = await request(app)
      .post('/cards')
      .send(cardData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('deve listar todos os cards', async () => {
    const response = await request(app)
      .get('/cards');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

});
