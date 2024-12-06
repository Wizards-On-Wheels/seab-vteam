FROM node:18-alpine

WORKDIR /client

COPY package*.json ./
COPY public/ ./public/
COPY src/ ./src/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
