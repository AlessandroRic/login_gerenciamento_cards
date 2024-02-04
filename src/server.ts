import app from './app';
import dotenv from 'dotenv';
import { AppDataSource } from './dataSource';

dotenv.config();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        // Inicia o servidor Express somente após a conexão com o banco de dados ser estabelecida
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error);
    });
