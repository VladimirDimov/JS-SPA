(function () {
    'use strict';

    function tripsSrv(dataSrv) {
        return {
            getLatestTrips: function () {
                var tripsPromise = dataSrv.get('api/trips');
                return tripsPromise;
            },
            create: function (trip) {
                return dataSrv.post('api/trips', trip);
            }
        };
    };

    angular.module('app.services')
        .factory('tripsSrv', ['dataSrv', tripsSrv]);
} ());