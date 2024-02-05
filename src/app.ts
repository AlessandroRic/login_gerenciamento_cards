import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Importando as rotas
import authRoutes from './routes/authRoutes';
import cardRoutes from './routes/cardRoutes';

// Importando os middlewares
import { authMiddleware } from './middleware/authMiddleware';

const app: Express = express();

// Configuração do bodyParser para receber requisições JSON
app.use(bodyParser.json());

// Configurando as rotas
app.use('/login', authRoutes);
app.use('/cards', authMiddleware, cardRoutes);

// Configuração para lidar com rotas não encontradas
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

export default app;
