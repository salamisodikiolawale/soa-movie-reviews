FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY microservices/ReviewService .
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]