# Board Of Shame

Special for [G.A.S. club](https://vk.com/gasclub)

## Deploy instructions (docker)

For use with [nginx-proxy](https://github.com/jwilder/nginx-proxy)

1. Clone this repo
2. Place your google credential file to `/deploy` folder
3. Change `VIRTUAL_HOST` in `docker-compose.yml`
4. Run commands: `docker-compose build` and then `docker-compose up -d` in `/deploy` folder

## Author

[Yaroslav Aksenov](https://github.com/flareair)

## License

[MIT](LICENSE)