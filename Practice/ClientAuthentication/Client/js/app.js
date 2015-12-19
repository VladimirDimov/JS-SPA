(function () {
	function config($routeProvider, $location) {
		$routeProvider
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

	function globalConstants() {
		return {
			baseAddress: 'localhost:1337'
		};
	};

	angular.module('app.services', []);
	angular.module('app.controllers', ['app.services']);
	angular.module('app.directives', []);
	angular.module('app.filters', []);
	angular.module('app', ['ngRoute', 'toastr', 'app.controllers', 'app.directives', 'app.filters'])
		.config(['$routeProvider', config])
		.constant('globalConstants', globalConstants);
} ());