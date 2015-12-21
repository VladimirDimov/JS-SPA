(function () {
    'use strict';

    function mdTrips() {
        return {
            restrict: 'A',
            replace: false,
            templateUrl: '/html/trips/trips-table.html',
            controller: 'TripsCtrl'
        };
    };

    angular.module('app.directives')
        .directive('mdTrips', [mdTrips]);
} ());