FROM node:16.3

ENV HOME=/home/app

RUN apt-get update && apt-get install htop

COPY package.json package-lock.json $HOME/node_docker/

WORKDIR $HOME/node_docker

RUN npm install --silent --progress=false

COPY ./src/server.js $HOME/node_docker/src/

EXPOSE 9001

CMD ["npm", "start"]