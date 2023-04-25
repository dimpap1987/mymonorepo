FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY decorate-angular-cli.js ./

RUN npm install
# RUN npm ci --production

COPY dist/ .
EXPOSE 3333

CMD ["node", "apps/api/main.js"]
