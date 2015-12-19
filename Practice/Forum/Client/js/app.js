var app = angular.module('app', ['ngRoute', 'ngAnimate', 'toastr']);

app.config(function ($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'html/home.html'
  })
    .when('/error/address', {
      templateUrl: 'html/error.html'
    })
    .when('/login', {
      templateUrl: 'html/auth/login.html'
    })
    .when('/register', {
      templateUrl: 'html/auth/register.html'
    })
    .when('/articles', {
      templateUrl: 'html/articles.html'
    })
    .otherwise({
      redirectTo: '/error/address'
    });
});

app.constant('globalConstants', {
  baseAddress: 'http://localhost:1111/'
});