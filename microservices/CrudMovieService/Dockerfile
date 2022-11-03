FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY microservices/SearchService .
RUN npm install
EXPOSE 3010
CMD [ "npm", "start" ]