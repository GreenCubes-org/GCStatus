[GreenCubes Status](http://status.greencubes.org)
========

An application for reviewing statuses of GreenCubes web-services: Site, Forum, API, Support System, Game server.

Written in Node.js with Express.js.

## Dependencies
* Node
* MySQL

## Installation
1. Clone repo, move to new directory and install node modules:
```git clone https://github.com/GreenCubes/GCStatus.git && cd GCStatus && npm install``` 
2. Import MySQL database:
```mysql -u username -p database_name < db.sql```
3. Create config file and open it with ```nano``` (you can replace it with your favourite editor):
```cp config.example.js config.js && nano config.js```
4. Set up [crontab](https://en.wikipedia.org/wiki/Cron) for ```node bin/getstatus```
Nope, google it yourself
5. Start up our application:
```node bin/www```
6. ???
7. PROFIT

## Copyright note
Copyright (c) 2014 GreenCubes. See the LICENSE file for license rights and limitations (MIT).

## Authors
Kern0 aka [Arseniy Maximov](http://kern0.ru) – Code, UI.<br>
MushroomKiller aka Sergey Tsvetkov – Design assets.