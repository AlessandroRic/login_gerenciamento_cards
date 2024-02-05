import { Router } from 'express';
import { CardController } from '../controllers/CardController';
import { loggingMiddleware } from '../middleware/loggingMiddleware';

const router = Router();
const cardController = new CardController();

// Rota para listar todos os cards
router.get('/cards', (req, res) => {
  cardController.getAllCards(req, res);
});

// Rota para criar um novo card
router.post('/cards', (req, res) => {
  cardController.createCard(req, res);
});

// Rota para buscar um card específico pelo ID
router.get('/cards/:id', (req, res) => {
  cardController.getCardById(req, res);
});

// Rota para atualizar um card existente
router.put('/cards/:id', loggingMiddleware, (req, res) => {
  cardController.updateCard(req, res);
});

// Rota para deletar um card
router.delete('/cards/:id', loggingMiddleware, (req, res) => {
  cardController.deleteCard(req, res);
});

export default router;
