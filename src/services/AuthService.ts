import jwt from 'jsonwebtoken';

export class AuthService {
  public generateToken(user: { nome: string; senha: string }): string {

    if(user.nome !== process.env.AUTH_USER || user.senha !== process.env.AUTH_PASSWORD) {
      return '';
    }
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não definido no .env');
    }

    const payload = { nome: user.nome, id: user.senha };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}
