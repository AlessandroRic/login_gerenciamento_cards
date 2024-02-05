module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      // Regras básicas
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-constant-condition': 'warn',
      'no-empty': 'warn',
  
      // Regras do TypeScript
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
  
      // Estilo de Código
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
  
      // Melhores práticas
      'eqeqeq': ['warn', 'always'],
      'curly': 'error',
      'no-else-return': 'warn',
      'no-multi-spaces': 'error',
      'consistent-return': 'warn',
  
      // Preferências pessoais (ajuste conforme necessário)
      'prefer-const': 'warn',
    },
  };
  