FROM node

COPY . .

EXPOSE 5000


CMD npm i && npm start