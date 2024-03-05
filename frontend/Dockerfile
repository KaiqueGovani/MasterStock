FROM node:alpine

RUN mkdir /frontend
WORKDIR /frontend

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
