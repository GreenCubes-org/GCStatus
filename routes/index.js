var express = require('express');
var router = express.Router();
var async = require('async');
var net = require('net');
var https = require('https');

var sendRequest = function (options, callback) {
	options = {
		host: options.host,
		port: options.port,
		path: '/',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	var req = https.request(options, function(res) {
		var output = '';

		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			output += chunk;
		});

		res.on('end', function() {
			if (res.statusCode === 200) {
				callback(true);
			} else {
				callback(false);
			}
		});
	});

	req.on('error', function(err) {
		callback(false);
	});

	req.end();
};

/* GET main page */
router.get('/', function (req, res) {

	var obj = {
		web: {
			status: null
		},
		api: {
			status: null
		},
		help: {
			status: null
		},
		game: {
			status: null,
			online: null
		}
	};

	async.waterfall([
		function getWebServerStatus(callback) {
			sendRequest({
				port: cfg.srv.web.port,
				host: cfg.srv.web.host
			}, function (status) {
				obj.web.status = status;

				callback(null, obj);
			});
		},
		function getAPIServerStatus(obj, callback) {
			sendRequest({
				port: cfg.srv.api.port,
				host: cfg.srv.api.host
			}, function (status) {
				obj.api.status = status;

				callback(null, obj);
			});
		},
		function getSupportSystemStatus(obj, callback) {
			sendRequest({
				port: cfg.srv.help.port,
				host: cfg.srv.help.host
			}, function (status) {
				obj.help.status = status;

				callback(null, obj);
			});
		},
		function getGameServerStatus(obj, callback) {
			var socket = net.connect({
				port: cfg.srv.main.port,
				host: cfg.srv.main.host
			}, function() {
				buf = new Buffer(2);
				buf[0] = 254;
				buf[1] = 1;
				socket.write(buf);
			});

			socket.setTimeout(4000, function () {
				if (callback != undefined) {
					obj.game.status = false;

					callback(null, obj);
				}
				socket.end();
			});

			socket.on("data", function(data) {
				var newdata = [];
				if (data[0] == 255) { // Server's magic response
					var iszero = false,
						y = 0;
					for (var i =  1; i < data.length; i++) {
						if (data[i] === 0 && iszero) { // Separator
							if (newdata[y].length > 0)
								y++;
							newdata[y] = "";
							continue;
						}
						if (newdata[y] === undefined) {
							newdata[y] = "";
						}
						if (data[i] !== 0) {
							iszero = false;
							var newchar = String.fromCharCode(data[i]);
							if (newchar !== undefined) {
								newdata[y] = newdata[y] + newchar;
							}
						} else {
							iszero = true;
						}
					}
					newdata = newdata[0].split('§');

					obj.game.status = true;
					obj.game.online = parseInt(newdata[1], 10);

					callback(null, obj);
				} else {
					obj.status = false;

					callback(null, obj);
				}
				socket.end();
			});

			socket.once('error', function(e) {
				obj.game.status = false;

				callback(null, obj);
			});
		}
	], function (err, obj) {
		if (err) throw err;

		res.render('index', {
			req: req,
			res: res,
			obj: obj
		});
	});
});

/* ALL 404 */
router.all('*', function (req, res) {
	res.render('404');
});

module.exports = router;