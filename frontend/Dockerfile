FROM node:22 AS dev

WORKDIR /app

COPY package*.json ./

RUN npm cache verify && npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]
