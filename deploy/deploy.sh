#!/bin/sh


ssh -i deploy_rsa itiq@176.9.5.132 << EOT
    cd docker/board_of_shame
    git pull
    cd deploy/
    docker-compose stop && docker-compose rm -f
    docker-compose build && docker-compose up -d
    exit
EOT