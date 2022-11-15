FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]