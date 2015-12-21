(function () {
    'use strict';

    function dataSrv($http, $q, globalConstants, authSrv) {
        var baseAddress = globalConstants.baseAddress;

        function get(url) {
            var headers = authSrv.getAuthorizationHeaders();
            var defered = $q.defer();
            var address = baseAddress + url;

            $http.get(address, headers)
                .success(function (res) {
                    defered.resolve(res);
                })
                .error(function (err) {
                    defered.reject(err);
                });

            return defered.promise;
        };

        function post(url, data) {
            var headers = authSrv.getAuthorizationHeaders();
            var address = baseAddress + url;
            var defered = $q.defer();

            $http.post(address, data, headers)
                .success(function (res) {
                    defered.resolve(res);
                })
                .error(function (err) {
                    defered.reject(err);
                });

            return defered.promise;
        };

        function put() {
            throw "Not implemented";
        };

        return {
            get: get,
            post: post,
            put: put
        }
    };

    angular.module('app.services')
        .factory('dataSrv', ['$http', '$q', 'globalConstants', 'authSrv', dataSrv]);
} ());