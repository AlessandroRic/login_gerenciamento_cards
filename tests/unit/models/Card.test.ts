import { Card } from '../../../src/models/Card';
import { AppDataSource } from '../../../src/dataSource'; 

describe('Testes do modelo Card', () => {
  beforeAll(async () => {
    // Inicializar conexão com o banco de dados
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await AppDataSource.destroy();
  });

it('deve criar um novo card', async () => {
    const cardData: Partial<Card> = { titulo: 'Novo Card', conteudo: 'Conteúdo do card', lista: 'Lista 1' };
    const card = Card.create(cardData);

    const savedCard = await AppDataSource.manager.save(card);

    expect(savedCard).toHaveProperty('id');
    expect((savedCard as Card).titulo).toBe(cardData.titulo);
});

  it('deve buscar um card existente', async () => {
    const card = await AppDataSource.manager.findOneBy(Card, { titulo: 'Novo Card' });

    expect(card).toBeDefined();
    expect(card?.titulo).toBe('Novo Card');
  });
});
