import { getRepository } from 'typeorm';
import { Card } from '../models/Card';

export class CardService {

  public async createCard(cardData: { titulo: string; conteudo: string; lista: string }): Promise<Card> {
    const cardRepository = getRepository(Card);
    const card = cardRepository.create(cardData);
    await cardRepository.save(card);
    return card;
  } 

  public async getAllCards(): Promise<Card[]> {
    const cards = await Card.find();
    return cards;
  }
    

  public async getCardById(id: number): Promise<Card | null> {
    const card = await Card.findOne({ where: { id } });
    return card;
  }
    

  public async updateCard(id: number, cardData: { titulo: string; conteudo: string; lista: string }): Promise<Card | null> {
    let card = await Card.findOne({ where: { id } });
    if (card) {
      Object.assign(card, cardData);
      card = await Card.save(card);
    }
    return card;
  }
    

  public async deleteCard(id: number): Promise<boolean> {
    const card = await Card.findOne({ where: { id } });
    if (card) {
      await Card.remove(card);
      return true;
    }
    return false;
  }
    
}
