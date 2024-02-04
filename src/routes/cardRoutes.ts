import { Router } from 'express';
import { CardController } from '../controllers/CardController';

const router = Router();
const cardController = new CardController();

// Rota para listar todos os cards
router.get('/', (req, res) => {
    cardController.getAllCards(req, res);
});

// Rota para criar um novo card
router.post('/', (req, res) => {
    cardController.createCard(req, res);
});

// Rota para buscar um card específico pelo ID
router.get('/:id', (req, res) => {
    cardController.getCardById(req, res);
});

// Rota para atualizar um card existente
router.put('/:id', (req, res) => {
    cardController.updateCard(req, res);
});

// Rota para deletar um card
router.delete('/:id', (req, res) => {
    cardController.deleteCard(req, res);
});

export default router;
