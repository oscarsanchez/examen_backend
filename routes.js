var usersController = require('./controllers/booksController');
var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Students')}}},
{method: 'GET', path: '/v1/users', config: usersController.getUsers},
{method: 'GET', path: '/v1/users/{userId}', config: usersController.getUser},
{method: 'POST', path: '/v1/users', config: usersController.createUser},
{method: 'PUT', path: '/v1/users/{userId}', config: usersController.updateUser},
{method: 'DELETE', path: '/v1/users/{userId}', config: usersController.deleteUser},
{method: 'DELETE', path: '/v1/user/{userId}', config: usersController.undeleteUser},

	{method: 'POST', path: '/v1/register', config: usersController.createUser},
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout},
];
