FROM node:12-buster

RUN apt-get update && apt-get upgrade -y && apt-get install -y -qq openjdk-11-jdk

WORKDIR /app
COPY data/ ./data/
COPY src/ ./src/
COPY tests/ ./tests/
COPY jest.config.js ./
COPY package.json ./
COPY reporter.js ./

RUN npm install
RUN STAGE=cicd npm run test -- tests/cicd/alwaysTrue

