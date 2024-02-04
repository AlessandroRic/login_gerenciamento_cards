# Estágio 1: Compilar e construir o aplicativo
FROM node:21.6.1 AS builder

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar arquivos de configuração do projeto para o contêiner
COPY package.json yarn.lock ./

# Instalar dependências do projeto
RUN yarn install

# Copiar os arquivos restantes do projeto para o contêiner
COPY . .

# Compilar o projeto TypeScript
RUN yarn build

# Estágio 2: Configurar a imagem de produção
FROM node:21.6.1

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar apenas as dependências de produção do estágio anterior
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production

# Copiar os arquivos compilados do estágio anterior
COPY --from=builder /app/dist ./dist

# Definir a variável de ambiente para indicar o ambiente de produção
ENV NODE_ENV=production

# Expõe a porta que a aplicação vai rodar
EXPOSE 5000

# Comando para executar o aplicativo
CMD ["node", "dist/app.js"]
