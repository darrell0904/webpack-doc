FROM node:alpine

# ADD package.json package-lock.json /code/
COPY package.json /code/
COPY dist  /code/dist/
COPY server /code/server/
COPY bin /code/bin/

WORKDIR /code/

# RUN npm install && npm install -g pm2@latest
RUN  npm install -g pm2@latest

# ADD . /code

CMD sh ./bin/cmd.sh
# CMD ping www.baidu.com

# CMD pm2 serve ./dist 80


# CMD node server/index.js
# CMD npm run dev 