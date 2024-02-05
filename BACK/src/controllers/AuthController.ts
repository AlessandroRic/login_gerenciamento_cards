import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
      this.authService = new AuthService();
    }

    public login(req: Request, res: Response): void {
      const { login, senha } = req.body;

      if (login === process.env.AUTH_USER && senha === process.env.AUTH_PASSWORD) {
        const token = this.authService.generateToken({ nome: login, senha: senha });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }
    }

}
