# build for development
FROM node:21.6-alpine3.18 As development

RUN apk add g++ make py3-pip py3-libgpiod

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# build for production
FROM node:21.6-alpine3.18 As build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

# production
FROM node:21.6-alpine3.18 As production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]