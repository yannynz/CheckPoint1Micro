FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install, npm install -g nodemon, npm install mongoose, npm install express

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

