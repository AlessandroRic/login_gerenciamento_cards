import { AuthService } from '../../../src/services/AuthService';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes do AuthService', () => {
  const authService = new AuthService();

  it('deve autenticar o usuário com credenciais válidas', () => {
    const authUser = process.env.AUTH_USER;
    const authPassword = process.env.AUTH_PASSWORD;

    const result = authService.generateToken(authUser, authPassword);
    
    expect(result).toBeTruthy();
  });

  it('não deve autenticar o usuário com credenciais inválidas', () => {
    const invalidUser = 'invalidUser';
    const invalidPassword = 'invalidPassword';

    const result = authService.generateToken(invalidUser, invalidPassword);
    
    expect(result).toBeFalsy();
  });

});