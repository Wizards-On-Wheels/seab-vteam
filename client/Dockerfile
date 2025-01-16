FROM node:18-alpine

WORKDIR /client

COPY package*.json ./
COPY src/ ./src/
COPY . ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
