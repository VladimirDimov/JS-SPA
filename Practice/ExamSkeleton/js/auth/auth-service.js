(function () {
    'use strict'

    function authSrv($http, $q, globalConstants, md5) {
        function login(user) {
            var defered = $q.defer();
            var data = "grant_type=password&username=" + user.username + "&password=" + md5.createHash(user.password || '');
            var address = globalConstants.baseAddress + 'api/users/login';

            $http.post(address, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (err) {
                defered.reject(err);
            });

            return defered.promise;
        };

        function register(user) {
            var defered = $q.defer();
            var address = globalConstants.baseAddress + 'api/users/register';

            var data = {
                Email: user.email,
                IsDriver: user.isDriver,
                Car: user.car,
                Password: md5.createHash(user.password || ''),
                ConfirmPassword: md5.createHash(user.confirmPassword || '')
            };

            $http.post(address, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (res) {
                defered.resolve(res);
            }).error(function (err) {
                defered.reject(err);
            });

            return defered.promise;
        };

        function updateUserOnLocalStorage(data) {
            localStorage.setItem('userInfo', JSON.stringify(data));
        };

        function logout() {
            var defered = $q.defer();
            var address = globalConstants.baseAddress + 'api/users/logout';
            var headers = getAuthorizationHeaders();

            $http.post(address, null, headers)
                .success(function (res) {
                    defered.resolve(res);
                }).error(function (err) {
                    defered.reject(err);
                });

            localStorage.clear();
            return defered.promise;
        };

        function getCurrentUserInfo() {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            return userInfo;
        }

        function getAuthorizationHeaders() {
            var userInfo = getCurrentUserInfo();
            if (!userInfo) {
                return {};
            } else {
                return {
                    headers: {
                        "Authorization": 'Bearer ' + (userInfo.access_token || '')
                    }
                }
            }
        }

        return {
            login: login,
            register: register,
            updateUserOnLocalStorage: updateUserOnLocalStorage,
            logout: logout,
            getCurrentUserInfo: getCurrentUserInfo,
            getAuthorizationHeaders: getAuthorizationHeaders
        }
    };

    angular.module('app.services')
        .factory('authSrv', ['$http', '$q', 'globalConstants', 'md5', authSrv]);
} ());