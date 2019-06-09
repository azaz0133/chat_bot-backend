FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install -g yarn && \
    yarn install

EXPOSE 3001

CMD [ "yarn","run","start:dev" ]