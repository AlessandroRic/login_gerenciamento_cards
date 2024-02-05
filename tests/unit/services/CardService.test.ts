jest.mock('typeorm', () => {
  const actualTypeORM = jest.requireActual('typeorm');

  class MockRepository {
    create = jest.fn().mockImplementation((entity) => entity);
    save = jest.fn().mockResolvedValue((entity: any) => ({ ...entity, id: 1 }));
    find = jest.fn().mockResolvedValue([]);
    findOneBy = jest.fn().mockImplementation((condition) => {
      if (condition.id === 1) {return Promise.resolve({ id: 1, ...condition });}
      return Promise.resolve(null);
    });
    remove = jest.fn().mockResolvedValue(true);
  }

  return {
    ...actualTypeORM,
    BaseEntity: class {},
    Entity: () => () => null,
    PrimaryGeneratedColumn: () => () => null,
    Column: () => () => null,
    DataSource: class {
      initialize = jest.fn().mockResolvedValue(null);
      getRepository = jest.fn().mockReturnValue(new MockRepository());
    },
  };
});

import { CardService } from '../../../src/services/CardService';

describe('CardService', () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
  });

  describe('createCard', () => {
    it('deve criar um novo card', async () => {
      const cardData = { titulo: 'Test Card', conteudo: 'Test Content', lista: 'Test List' };
      const createdCard = await cardService.createCard(cardData);

      expect(createdCard).toBeDefined();
      expect(createdCard.titulo).toBe(cardData.titulo);
      expect(createdCard.conteudo).toBe(cardData.conteudo);
      expect(createdCard.lista).toBe(cardData.lista);
    });
  });

  describe('getAllCards', () => {
    it('deve retornar todos os cards', async () => {
      const cards = await cardService.getAllCards();

      expect(cards).toBeDefined();
      expect(Array.isArray(cards)).toBe(true);
    });
  });

  describe('getCardById', () => {
    it('deve retornar um card pelo seu ID', async () => {
      const cardId = 1;
      const card = await cardService.getCardById(cardId);

      expect(card).toBeDefined();
      expect(card?.id).toBe(cardId);
    });

    it('deve retornar null se o card não for encontrado', async () => {
      const cardId = 999;
      const card = await cardService.getCardById(cardId);

      expect(card).toBeNull();
    });
  });

  describe('updateCard', () => {
    it('deve retornar null se o card não for encontrado para atualização', async () => {
      const cardId = 999;
      const updatedCardData = { titulo: 'Updated Card', conteudo: 'Updated Content', lista: 'Updated List' };
      const updatedCard = await cardService.updateCard(cardId, updatedCardData);

      expect(updatedCard).toBeNull();
    });
  });

  describe('deleteCard', () => {
    it('deve deletar um card', async () => {
      const cardId = 1;
      const isDeleted = await cardService.deleteCard(cardId);

      expect(isDeleted).toBe(true);
    });

    it('deve retornar false se o card não for encontrado para deleção', async () => {
      const cardId = 999;
      const isDeleted = await cardService.deleteCard(cardId);

      expect(isDeleted).toBe(false);
    });
  });
});
