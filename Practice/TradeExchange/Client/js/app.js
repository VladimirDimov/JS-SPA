(function () {
	function config($routeProvider, $location) {
		$routeProvider
			.when('/', {
				controller: function ($location) {
					$location.path('/home');
				},
				template: ''
			})
			.when('/home', {

			})
			.when('/register', {
				templateUrl: '/html/auth/register.html',
				controller: 'RegisterCtrl'
			})
			.when('/login', {
				templateUrl: 'html/auth/login.html',
				controller: 'LoginCtrl'
			})
			.when('logout', {

			})
			.otherwise({
				controller: function ($location) {
					$location.path('/home');
				},
				template: ''
			});
	};

	angular.module('app.services', ['angular-md5']);
	angular.module('app.controllers', ['app.services']);
	angular.module('app.directives', []);
	angular.module('app.filters', []);
	angular.module('app', ['ngRoute', 'toastr', 'app.controllers', 'app.directives', 'app.filters'])
		.config(['$routeProvider', config])
		.constant('globalConstants', {
			baseAddress: 'http://localhost:1337/'
		});
} ());