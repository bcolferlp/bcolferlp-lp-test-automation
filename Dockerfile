FROM circleci/node:12-buster-browsers
WORKDIR /home/circleci

RUN whoami; pwd; ls -ld .
RUN export CHROME_DRIVER_VERSION=$(curl -sS https://chromedriver.storage.googleapis.com/LATEST_RELEASE)  && \
    echo "CHROME DRIVER: $CHROME_DRIVER_VERSION" && \
    sudo curl -sS -o - https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip > chromedriver_linux.zip
RUN sudo unzip ./chromedriver_linux.zip -d ./ && sudo chown circleci chromedriver && chmod 755 chromedriver

COPY --chown=circleci data/ ./data/
COPY --chown=circleci src/ ./src/
COPY --chown=circleci tests/ ./tests/
COPY --chown=circleci jest.config.js ./
COPY --chown=circleci package.json ./
COPY --chown=circleci reporter.js ./
COPY --chown=circleci .env/ ./
COPY --chown=circleci .babelrc/ ./
RUN npm install

COPY  --chown=circleci scripts/ ./scripts/
RUN chmod +x ./scripts/*.sh

ENTRYPOINT [ "bash", "-c", "./scripts/run-tests.sh"]