FROM node:current-slim

MAINTAINER tester<tester@t.com>

WORKDIR app

COPY package.json .

ENV DEVIAN_FRONTED=noninteractive
ENV NODE_ENV production

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]

COPY . .
