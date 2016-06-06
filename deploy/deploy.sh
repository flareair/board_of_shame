#!/bin/sh

ssh -i ./deploy/deploy_rsa $SSH_USER@$SSH_HOST << EOT
    cd docker/board_of_shame
    git pull
    cd deploy/
    docker-compose stop && docker-compose rm -f
    docker-compose build && docker-compose up -d
    exit
EOT