FROM node:18.17.1

WORKDIR /MasterStock


COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 3000