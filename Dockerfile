FROM node:alpine

RUN mkdir -p /app/client

WORKDIR /app/client
COPY client/package*.json  \
  client/*.js ./

COPY client/public ./public
COPY client/src ./src
RUN npm install
RUN npm run build

WORKDIR /app
COPY package*.json app.js ./
RUN npm install

COPY bin ./bin
COPY config ./config
COPY middlewares ./middlewares
COPY models ./models
COPY routes ./routes
COPY services ./services
COPY utils ./utils

EXPOSE 3000
CMD [ "npm", "run", "start" ]