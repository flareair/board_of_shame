FROM node:latest

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Install base packages
RUN apt-get clean && apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get -yq install ssmtp git xvfb default-jre google-chrome-stable

WORKDIR /app

RUN git clone https://github.com/flareair/board_of_shame.git ./ && git checkout tags/0.7.0

COPY credentials.json /app/credentials.json
COPY start.sh /app/start.sh

ENV PORT 8080
ENV NODE_ENV test
ENV TABLE test
ENV GOOGLE_APPLICATION_CREDENTIALS /app/credentials.json

RUN npm i

CMD sh start.sh

EXPOSE 8080