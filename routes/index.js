var express = require('express');
var router = express.Router();
var async = require('async');
var moment = require('moment');


/* GET main page */
router.get('/', function (req, res) {

	async.waterfall([
		function getLatestStatus(callback) {
			appdbconn.query('SELECT * FROM statuses ORDER BY id DESC LIMIT 1;', function (err, result) {
				if (err) return callback(err);
				
				callback(null, result[0]);
			});
		},
		function serializeStatus(result, callback) {
			
			var obj = {
				web: {
					status: result.web_status
				},
				api: {
					status: result.api_status
				},
				help: {
					status: result.help_status
				},
				main: {
					status: result.main_status,
					online: result.main_online
				},
				createdAt: moment(result.createdAt).fromNow()
			};
			
			callback(null, obj);
		}
	], function (err, obj) {
		if (err) return res.status(500).render('500');
		
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