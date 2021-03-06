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
                templateUrl: '/html/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/register', {
                templateUrl: '/html/auth/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/login', {
                templateUrl: 'html/auth/login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                controller: function () {

                }
            })
            .when('/drivers', {
                templateUrl: '/html/drivers/drivers.html',
                controller: 'DriversCtrl'
            })
            .when('/trips', {
                templateUrl: 'html/trips/trips.html',
                controller: 'TripsCtrl'
            })
            .when('/trips/create', {
                templateUrl: '/html/trips/create-trip.html',
                controller: 'CreateTripCtrl'
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
    angular.module('app', ['ngRoute', 'toastr', 'app.controllers', 'app.directives', 'app.filters', 'kendo.directives'])
        .config(['$routeProvider', config])
        .constant('globalConstants', {
            baseAddress: 'http://localhost:1337/'
        });
} ());