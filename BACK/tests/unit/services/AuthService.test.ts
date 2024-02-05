import { AuthService } from '../../../src/services/AuthService';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes do AuthService', () => {
  const authService = new AuthService();

  it('deve autenticar o usuário com credenciais válidas', () => {
    const user = {
      nome: process.env.AUTH_USER || '',
      senha: process.env.AUTH_PASSWORD || ''
    };

    const result = authService.generateToken(user);
    
    expect(result).toBeTruthy();
  });

  it('não deve autenticar o usuário com credenciais inválidas', () => {
    const invalidUser = {
      nome: 'invalidUser',
      senha: 'invalidPassword'
    };

    const result = authService.generateToken(invalidUser);
    
    expect(result).toBeFalsy();
  });

});
