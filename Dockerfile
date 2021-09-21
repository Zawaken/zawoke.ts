FROM node:16.9.1-alpine3.14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY .env ./

RUN npm i

CMD ["ts-node", "source/bot.ts"]
