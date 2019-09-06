FROM node:alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install --production

EXPOSE 3002

CMD npm run seed && \
    npm start
