FROM node:13-buster

RUN apt-get update && apt-get install -y -qq openjdk-11-jdk awscli jq curl wget unzip xvfb libxi6 libgconf-2-4 vim

WORKDIR /tmp

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add && \
    echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update -q && \
    apt-get install -y -q google-chrome-stable
RUN export CHROME_DRIVER_VERSION=$(curl -sS https://chromedriver.storage.googleapis.com/LATEST_RELEASE)  && \
    echo "CHROME DRIVER: $CHROME_DRIVER_VERSION" && \
    curl -sS -o - https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip > chromedriver_linux.zip
RUN unzip ./chromedriver_linux.zip -d ./ && \
    mv -f ./chromedriver /usr/local/bin/chromedriver && \
    chown root:root /usr/local/bin/chromedriver && \
    chown root:root /usr/local/bin/chromedriver

WORKDIR /app
ENV AWS_ACCOUNT_KEY_ID=""
ENV AWS_ACCOUNT_SECRET_KEY=""
ENV AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-362472370574}
ENV STAGE=${STAGE:-"dev"}

COPY data/ ./data/
COPY src/ ./src/
COPY tests/ ./tests/
COPY jest.config.js ./
COPY package.json ./
COPY reporter.js ./
COPY .env/ ./
RUN npm install

COPY scripts/ ./scripts/
COPY list-of-tests-to-run.txt ./
RUN chmod +x ./scripts/*.sh

ENTRYPOINT [ "bash", "-c", "./scripts/run-tests.sh"]
