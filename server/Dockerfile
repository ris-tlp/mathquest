FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build && cp .env dist/.env

EXPOSE 8000
CMD ["npm","start"]