FROM node:12-alpine as builder

WORKDIR /backend
COPY package.json /backend/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /backend


EXPOSE 5000
CMD ["node", "server.js"]
