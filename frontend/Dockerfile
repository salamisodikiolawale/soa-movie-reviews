FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/package.json
RUN npm install
# RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . /src/app
EXPOSE 3000
CMD [ "npm", "start" ]