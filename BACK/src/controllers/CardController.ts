import { Request, Response } from 'express';
import { CardService } from '../services/CardService';
import { ICard } from '../types';

export class CardController {
    private cardService: CardService;

    constructor() {
      this.cardService = new CardService();
    }

    public async createCard(req: Request, res: Response): Promise<Response> {
      try {
        const cardData: ICard = req.body;
        const newCard = await this.cardService.createCard(cardData);
        return res.status(201).json(newCard);
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o card', error });
      }
    }

    public async getAllCards(req: Request, res: Response): Promise<Response> {
      try {
        const cards = await this.cardService.getAllCards();
        return res.json(cards);
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao encontrar os cards', error });
      }
    }

    public async getCardById(req: Request, res: Response): Promise<Response> {
      try {
        const cardId = parseInt(req.params.id);
        const card = await this.cardService.getCardById(cardId);
        if (card) {
          return res.json(card);
        }
        return res.status(404).json({ message: 'Card não encontrado' });
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o card', error });
      }
    }

    public async updateCard(req: Request, res: Response): Promise<Response> {
      try {
        const cardId = parseInt(req.params.id);
        const cardData: ICard = req.body;
        const updatedCard = await this.cardService.updateCard(cardId, cardData);
        if (updatedCard) {
          return res.json(updatedCard);
        }
        return res.status(404).json({ message: 'Card não encontrado' });
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar o card', error });
      }
    }

    public async deleteCard(req: Request, res: Response): Promise<Response> {
      try {
        const cardId = parseInt(req.params.id);
        const success = await this.cardService.deleteCard(cardId);
        if (success) {
          return res.status(204).send();
        }
        return res.status(404).json({ message: 'Card não encontrado' });
      } catch (error) {
        return res.status(500).json({ message: 'Erro deletar o card', error});
      }
    }
}
