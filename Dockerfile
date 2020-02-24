FROM node:12-buster

RUN apt-get update && apt-get upgrade -y && apt-get install -y -qq openjdk-11-jdk

WORKDIR /app
COPY allure-results/  ./allure-results/
COPY data/ ./data/
COPY src/ ./src/
COPY tests/ ./tests/
COPY jest.config.js ./
COPY package-lock.json ./
COPY package.json ./
COPY reporter.js ./

kRUN  npm ci
