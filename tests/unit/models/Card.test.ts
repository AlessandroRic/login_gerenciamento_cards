import { Card } from '../models/Card'; //ToDo
import { createConnection, getConnection } from 'typeorm';

describe('Testes do modelo Card', () => {
  beforeAll(async () => {
    // Inicializar conexão com o banco de dados
    await createConnection();
  });

  afterAll(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await getConnection().close();
  });

  it('deve criar um novo card', async () => {
    const cardData = { titulo: 'Novo Card', conteudo: 'Conteúdo do card', lista: 'Lista 1' };
    const card = Card.create(cardData);

    const savedCard = await Card.save(card);

    expect(savedCard).toHaveProperty('id');
    expect(savedCard.titulo).toBe(cardData.titulo);
  });

  it('deve buscar um card existente', async () => {
    const card = await Card.findOne({ where: { titulo: 'Novo Card' } });

    expect(card).toBeDefined();
    expect(card?.titulo).toBe('Novo Card');
  });

});
