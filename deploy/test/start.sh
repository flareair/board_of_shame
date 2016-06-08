#!/bin/sh

export DISPLAY=0:0
Xvfb :0 -ac -screen 0 1024x768x24 &
node_modules/protractor/bin/webdriver-manager update --standalone --firefox
node_modules/protractor/bin/webdriver-manager start 2>&1 &
node_modules/webpack/bin/webpack.js
npm run server-detached

npm test