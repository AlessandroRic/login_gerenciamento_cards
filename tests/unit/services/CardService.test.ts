import { CardService } from '../../../src/services/CardService';

describe('Testes do CardService', () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
  });

it('deve criar um novo card', async () => {
    const cardData = { titulo: 'Novo Card', conteudo: 'Conteúdo do card', lista: 'Lista 1' };
    const novoCard = await cardService.createCard(cardData);

    expect(novoCard).toHaveProperty('id');
    expect(novoCard.titulo).toEqual(cardData.titulo);
});

it('deve buscar um card pelo ID', async () => {
    const cardId = 1;
    const card = await cardService.getCardById(cardId);

    expect(card).toBeDefined();
    if (card !== null) {
        expect(card.id).toEqual(cardId);
    }
});
});
