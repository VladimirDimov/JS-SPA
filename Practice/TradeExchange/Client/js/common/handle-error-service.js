(function () {
    'use strict';

    function handleErrorSrv(error) {
        return {
            handle: function (error) {
                var response = [];

                for (var key in error) {
                    response.push(error[key]);
                }

                return response.join(' ');
            }
        };
    };

    angular.module('app.services')
        .factory('handleErrorSrv', [handleErrorSrv]);
} ());