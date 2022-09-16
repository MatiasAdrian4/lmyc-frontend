FROM node:alpine

RUN mkdir -p /lmyc
WORKDIR /lmyc

COPY . /lmyc

RUN npm install

RUN npm install @openapitools/openapi-generator-cli -g && npm run generate-backend-client

RUN npm run build

EXPOSE 3000

CMD npm run start
