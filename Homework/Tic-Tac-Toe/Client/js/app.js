var app = angular.module('app', ['ngRoute', 'toastr']);

app.config(function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: '/html/auth/login.html',
		controller: 'LoginCtrl'
	}).when('/register', {
		templateUrl: '/html/auth/register.html'
	}).when('/games', {
		templateUrl: '/html/games.html',
		controller: 'GamesCtrl'
	}).when('/games/play', {
		templateUrl: 'html/play.html',
		controller: 'PlayCtrl'
	}).when('/home', {
		templateUrl: 'html/home.html'
	})
});

app.constant('globalConstants', {
	baseAddress: 'http://localhost:33257/'
});