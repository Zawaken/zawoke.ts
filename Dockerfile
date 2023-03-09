FROM node:latest

WORKDIR /usr/local/zawoke

COPY package*.json ./
COPY .env ./
RUN npm install \
  && npm cache clean --force

ENV PATH=/usr/local/zawoke/node_modules/.bin:$PATH

WORKDIR /usr/local/zawoke/app

COPY . .

CMD [ "bash", "-c", "rm -rf /usr/local/zawoke/app/node_modules/* && npm start"]
