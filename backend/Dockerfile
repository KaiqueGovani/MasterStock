FROM node:alpine

RUN mkdir /backend
WORKDIR /backend

RUN npm i -g @nestjs/cli

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD [ "npm", "run", "start:dev" ]
