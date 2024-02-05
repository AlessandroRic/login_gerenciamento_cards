# Definindo a imagem do projeto
FROM node:21.6.1

# Definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiar arquivos de configuração do projeto para o contêiner
COPY package.json yarn.lock ./

# Instalar dependências do projeto
RUN yarn install

# Copiar os arquivos restantes do projeto para o contêiner
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 5000

# Comando para executar o aplicativo
CMD ["yarn", "dev"]
