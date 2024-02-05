import { AppDataSource } from '../dataSource';
import { Card } from '../models/Card';

export class CardService {

  public async createCard(cardData: { titulo: string; conteudo: string; lista: string }): Promise<Card> {
    const cardRepository = AppDataSource.getRepository(Card);
    const card = cardRepository.create(cardData);
    await cardRepository.save(card);
    return card;
  }

  public async getAllCards(): Promise<Card[]> {
    const cards = await AppDataSource.getRepository(Card).find();
    return cards;
  }

  public async getCardById(id: number): Promise<Card | null> {
    const card = await AppDataSource.getRepository(Card).findOneBy({ id });
    return card;
  }

  public async updateCard(id: number, cardData: { titulo: string; conteudo: string; lista: string }): Promise<Card | null> {
    const cardRepository = AppDataSource.getRepository(Card);
    let card = await cardRepository.findOneBy({ id });
    if (card) {
      Object.assign(card, cardData);
      card = await cardRepository.save(card);
    }
    return card;
  }

  public async deleteCard(id: number): Promise<boolean> {
    const cardRepository = AppDataSource.getRepository(Card);
    const card = await cardRepository.findOneBy({ id });
    if (card) {
      await cardRepository.remove(card);
      return true;
    }
    return false;
  }

}
