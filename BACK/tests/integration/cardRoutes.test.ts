import request from 'supertest';
import app from '../../src/app'; 
import dotenv from 'dotenv';
import { AppDataSource } from '../../src/dataSource'; 

dotenv.config();

describe('Testes das rotas de card', () => {
  let token: any;
  let cardId: any;
  
  beforeAll(async () => {
    await AppDataSource.initialize();
    
    const loginResponse = await request(app)
      .post('/login') 
      .send({
        login: process.env.AUTH_USER,
        senha: process.env.AUTH_PASSWORD,
      });

    token = loginResponse.body.token;
  });

  
  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('deve criar um novo card', async () => {
    
    const cardData = { titulo: 'Novo Card', conteudo: 'Conteúdo do card', lista: 'Lista 1' };
    
    const response = await request(app)
      .post('/cards')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    cardId = response.body.id;
  });

  it('deve listar todos os cards', async () => {
    
    const response = await request(app)
      .get('/cards')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });


  it('deve listar um card especifico', async () => {
    
    const response = await request(app)
      .get('/cards/' + cardId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('deve apagar um card especifico', async () => {
    
    const response = await request(app)
      .delete('/cards/' + cardId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
  
});
