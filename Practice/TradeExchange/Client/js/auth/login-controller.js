(function () {
    'use strict'

    function LoginCtrl($scope, $location, authSrv, validationSrv, handleErrorSrv, toastr) {
        $scope.login = function login() {
            authSrv
                .login($scope.user.username, $scope.user.password)
                .then(function (res) {
                    toastr.success('Successful login!');
                    authSrv.updateUserOnLocalStorage(res);
                    $location.path('/home');

                }, function (err) {
                    toastr.error(handleErrorSrv.handle(err));
                });
        };
    };

    angular.module('app.controllers')
        .controller('LoginCtrl', ['$scope', '$location', 'authSrv', 'validationSrv', 'handleErrorSrv', 'toastr', LoginCtrl]);
} ());