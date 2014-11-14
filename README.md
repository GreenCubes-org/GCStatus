[GreenCubes Status](http://status.greencubes.org)
========

An application for reviewing statuses of GreenCubes web-services: Site, Forum, API, Support System, Game server.

Written in Node.js with Express.js.

## Dependencies
* Node
* MySQL

## Installation
1. ```git clone https://github.com/GreenCubes/GCStatus.git && npm install```
2. ```cp config.example.js config.js && nano config.js```
3. Set up [crontab](https://en.wikipedia.org/wiki/Cron) for ```node bin/getstatus```
4. ```node bin/www```
5. ```???```
6. ```PROFIT```

## Copyright note
Copyright (c) 2014 GreenCubes. See the LICENSE file for license rights and limitations (MIT).

## Authors
Kern0 aka [Arseniy Maximov](http://kern0.ru) – Code, UI.<br>
MushroomKiller aka Sergey Tsvetkov – Design assets.