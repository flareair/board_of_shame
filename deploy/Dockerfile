FROM node:latest

# Install base packages
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get -yq install ssmtp git

WORKDIR /app

RUN git clone https://github.com/flareair/board_of_shame.git ./ && git checkout tags/0.7.0

COPY credentials.json /app/credentials.json

ENV PORT 80
ENV NODE_ENV production
ENV GOOGLE_APPLICATION_CREDENTIALS /app/credentials.json

RUN npm i

CMD npm start

EXPOSE 80