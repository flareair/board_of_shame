# Board Of Shame

Special for [G.A.S. club](https://vk.com/gasclub).

Deployed:
[boardofshame.2enter.ru](http://boardofshame.2enter.ru/)

## Requirements

Was tested on Linux with Node v6.2.0, use docker image please.

## How to start

1. Clone this repo, move to project folder
2. Run `npm i`
3. Run `npm start`

## Deploy instructions (docker)

For use with [nginx-proxy](https://github.com/jwilder/nginx-proxy).

1. Clone this repo, move to project folder
2. Place your [google credential file](https://github.com/google/google-auth-library-nodejs#download-your-service-account-credentials-json-file) to `/deploy` folder
3. Change `VIRTUAL_HOST` in `docker-compose.yml`
4. Run commands: `docker-compose build` and then `docker-compose up -d` in `/deploy` folder

## TODO

* Unit and e2e testing
* API full text search
* Telegram bot

## Links

* [Original table](https://docs.google.com/spreadsheets/d/12k92qZdkAvnff38qMY8P0U8F1UVWjE0sxhEnEGDfLd8/edit#gid=0)
* [VK group](http://vk.com/boardofshame)

## Author

[Yaroslav Aksenov](https://github.com/flareair)

## License

[MIT](LICENSE)