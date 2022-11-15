FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . .
RUN npm install
EXPOSE 3005
CMD [ "npm", "start" ]