FROM node:lts-alpine3.12
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD node app.js