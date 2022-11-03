FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY microservices/EmailService .
RUN npm install
EXPOSE 3004
CMD [ "npm", "start" ]