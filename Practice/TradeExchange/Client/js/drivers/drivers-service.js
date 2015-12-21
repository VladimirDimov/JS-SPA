(function () {
    'use strict'

    function driversSrv(dataSrv) {
        return {
            getDrivers: function getDrivers(page, size, authorizationHeaders) {
                var driversPromise = dataSrv.get('api/drivers');
                return driversPromise;
            },
            filterByName(val, page) {
                var queryString = '?page=' + page + '&username=' + val;
                return dataSrv.get('api/drivers' + queryString);
            }
        };
    };

    angular.module('app.services')
        .factory('driversSrv', ['dataSrv', driversSrv]);
} ());