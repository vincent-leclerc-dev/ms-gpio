FROM node:21.6-alpine3.18

RUN apk add g++ make py3-pip py3-libgpiod

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
