import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// Rota de login
router.post('/login', (req, res) => {
    authController.login(req, res);
});

export default router;
