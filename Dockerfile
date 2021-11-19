FROM node:alpine

RUN mkdir -p /app/client
RUN mkdir -p /app/src

WORKDIR /app/client
COPY client/package*.json  \
  client/*.js ./

COPY client/public ./public
COPY client/src ./src
RUN npm install
RUN npm run build

WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install

WORKDIR /app/src
COPY src/app.ts ./
COPY src/bin ./bin
COPY src/config ./config
COPY src/middlewares ./middlewares
COPY src/models ./models
COPY src/routes ./routes
COPY src/services ./services
COPY src/utils ./utils

WORKDIR /app
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
