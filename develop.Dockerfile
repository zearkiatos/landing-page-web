FROM node:18-alpine

RUN echo -e "http://nl.alpinelinux.org/alpine/v3.17/main\nhttp://nl.alpinelinux.org/alpine/v3.17/community" > /etc/apk/repositories
RUN apk update && apk add python3 make g++
RUN apk add --update nodejs npm

WORKDIR /app

COPY . ./
RUN npm install -g npm
RUN npm install -g live-server
RUN npm install

EXPOSE 8081

ENTRYPOINT ["sh", "./docker/entrypoint.sh"]