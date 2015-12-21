(function () {
    'use strict'

    function LoginCtrl($scope, $location, authSrv, validationSrv, handleErrorSrv, notifier) {
        $scope.login = function login(user) {
            authSrv
                .login(user)
                .then(function (res) {
                    notifier.success('Successful login!');
                    authSrv.updateUserOnLocalStorage(res);
                    $location.path('/home');

                }, function (err) {
                    notifier.error(err);
                });
        };
    };

    angular.module('app.controllers')
        .controller('LoginCtrl', ['$scope', '$location', 'authSrv', 'validationSrv', 'handleErrorSrv', 'notifier', LoginCtrl]);
} ());