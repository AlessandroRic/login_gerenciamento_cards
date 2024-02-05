import { Request, Response } from 'express';
import { CardController } from '../../../src/controllers/CardController';
import * as CardServiceModule from '../../../src/services/CardService';
import { Card } from '../../../src/models/Card';

jest.mock('../../../src/services/CardService');

describe('CardController', () => {
  let cardController: CardController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockCardService: jest.Mocked<CardServiceModule.CardService>;

  beforeEach(() => {
    // Criando um mock do CardService
    mockCardService = new CardServiceModule.CardService() as jest.Mocked<CardServiceModule.CardService>;
    jest.spyOn(CardServiceModule, 'CardService').mockImplementation(() => mockCardService);

    cardController = new CardController();

    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('createCard', () => {
    it('deve criar um novo card e retornar status 201', async () => {
      const cardData = { titulo: 'Novo Card', conteudo: 'Conteúdo', lista: 'Lista' };
      const newCard = new Card();
      Object.assign(newCard, { id: 1, ...cardData });

      mockCardService.createCard.mockResolvedValue(newCard);

      mockRequest.body = cardData;

      await cardController.createCard(mockRequest as Request, mockResponse as Response);

      expect(mockCardService.createCard).toHaveBeenCalledWith(cardData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(newCard);
    });
  });

  describe('getAllCards', () => {
    it('deve retornar todos os cards', async () => {
      const mockCards = [new Card(), new Card()];
      mockCardService.getAllCards.mockResolvedValue(mockCards);

      await cardController.getAllCards(mockRequest as Request, mockResponse as Response);

      expect(mockCardService.getAllCards).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockCards);
    });
  });

  describe('getCardById', () => {
    it('deve retornar um card pelo ID', async () => {
      const cardId = 1;
      const mockCard = new Card();
      Object.assign(mockCard, { id: cardId });
      mockCardService.getCardById.mockResolvedValue(mockCard);

      mockRequest.params = { id: cardId.toString() };

      await cardController.getCardById(mockRequest as Request, mockResponse as Response);

      expect(mockCardService.getCardById).toHaveBeenCalledWith(cardId);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCard);
    });
  });

  describe('updateCard', () => {
    it('deve atualizar um card', async () => {
      const cardId = 1;
      const cardData = { titulo: 'Atualizado', conteudo: 'Atualizado', lista: 'Atualizada' };
      const updatedCard = new Card();
      Object.assign(updatedCard, { id: cardId, ...cardData });
      mockCardService.updateCard.mockResolvedValue(updatedCard);

      mockRequest.params = { id: cardId.toString() };
      mockRequest.body = cardData;

      await cardController.updateCard(mockRequest as Request, mockResponse as Response);

      expect(mockCardService.updateCard).toHaveBeenCalledWith(cardId, cardData);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedCard);
    });
  });

  describe('deleteCard', () => {
    it('deve deletar um card e retornar status 204', async () => {
      const cardId = 1;
      mockCardService.deleteCard.mockResolvedValue(true);

      mockRequest.params = { id: cardId.toString() };

      await cardController.deleteCard(mockRequest as Request, mockResponse as Response);

      expect(mockCardService.deleteCard).toHaveBeenCalledWith(cardId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });
  });
});
