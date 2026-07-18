ARG NODE_VERSION=22.18.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile
COPY . .

EXPOSE 3000
CMD yarn start:dev


