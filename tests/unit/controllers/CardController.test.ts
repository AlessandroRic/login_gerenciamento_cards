import { CardController } from '../../../src/controllers/CardController';
import { Request, Response } from 'express';

describe('Testes do CardController', () => {
  let cardController: CardController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let response: any;

  beforeEach(() => {
    cardController = new CardController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockImplementation((result) => {
        response = result;
        return mockResponse as Response;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('deve criar um card e retornar o card com ID', async () => {
    mockRequest.body = { titulo: 'Novo Card', conteudo: 'Conteúdo do card', lista: 'Lista 1' };

    await cardController.createCard(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(response).toHaveProperty('id');
    expect(response.titulo).toEqual('Novo Card');
  });

  it('deve listar todos os cards', async () => {
    await cardController.getAllCards(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(Array.isArray(response)).toBeTruthy();
  });

  it('deve atualizar um card existente', async () => {
    const cardId = 1; // Exemplo de ID de card
    mockRequest.params = { id: cardId.toString() };
    mockRequest.body = { titulo: 'Card Atualizado', conteudo: 'Conteúdo atualizado', lista: 'Lista 2' };

    await cardController.updateCard(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(response.id).toEqual(cardId);
    expect(response.titulo).toEqual('Card Atualizado');
  });

  it('deve deletar um card', async () => {
    const cardId = 1; // Exemplo de ID de card
    mockRequest.params = { id: cardId.toString() };

    await cardController.deleteCard(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

});
