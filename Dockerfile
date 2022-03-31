FROM node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# RUN apk add --update python make g++ && rm -rf /var/cache/apk/*

RUN npm install

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]