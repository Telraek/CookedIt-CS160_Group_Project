FROM node:current-slim

WORKDIR /usr/src/app/backend
COPY package.json .
RUN npm install

EXPOSE 5000
CMD [ "node", "server.js" ]


COPY . .