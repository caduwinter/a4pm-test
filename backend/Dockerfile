FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache verify && npm install


COPY . .

EXPOSE 7000

CMD ["npm", "run", "dev"]