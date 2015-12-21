(function () {
    'use strict';

    function helpersSrv() {
        function formatDateTime(dateTime) {
            var date = new Date(dateTime);
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var time = date.toTimeString();

            return month + ' ' + day + ', ' + year + time;
        };

        return {
            formatDateTime: formatDateTime
        }
    };

    angular.module('app.services')
        .factory('helpersSrv', [helpersSrv]);
} ());