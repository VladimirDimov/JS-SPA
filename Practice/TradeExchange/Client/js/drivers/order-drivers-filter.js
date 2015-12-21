(function () {
    'use strict';

    function orderDrivers() {
        return function (input, orderByVal) {
            if (orderByVal == 'name') {
                input.sort(function (a, b) {
                    return a.name - b.name;
                });
            } else if (orderByVal == 'numberOfTotalTrips') {
                input.sort(function (a, b) {
                    return a.numberOfTotalTrips - b.numberOfTotalTrips;
                });
            } else if (orderByVal == 'numberOfUpcomingTrips') {
                input.sort(function (a, b) {
                    return a.numberOfUpcomingTrips - b.numberOfUpcomingTrips;
                });
            };

            return input;
        };
    };

    angular.module('app.filters')
        .filter('orderDrivers', [orderDrivers]);
} ());