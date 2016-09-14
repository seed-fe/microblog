// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {title: 'Express'});
	});
	app.get('/u/:user', function(req, res) {

	});
	app.post('/post', function(req, res) {

	});
	app.get('/reg', function(req, res) {

	});
	app.post('/reg', function(req, res) {

	});
	app.get('/login', function(req, res) {

	});
	app.post('/login', function(req, res) {

	});
	app.get('/logout', function(req, res) {
		
	});
};