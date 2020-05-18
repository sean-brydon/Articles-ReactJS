FROM node:12-alpine as build 

WORKDIR /client

COPY package*.json /client/

RUN npm install 
COPY . /client/
EXPOSE 3000

CMD ["npm","start"]
