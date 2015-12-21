(function () {
    'user strict'

    function RegisterCtrl($scope, $location, authSrv, notifier, validationSrv) {
        $scope.user = {};
        $scope.register = function register(user) {
            // try {
            //     validationSrv.validateEmail($scope.user.email);
            //     validationSrv.validatePassword($scope.user.password);
            //     validationSrv.validateConfirmPassword($scope.user.password, $scope.user.confirmPassword);
            //     validationSrv.validateCar($scope.user.isDriver, $scope.user.car);
            // } catch (error) {
            //     notifier.error(error.message || error);
            //     return;
            // }
            authSrv.register(user)
                .then(function (data) {
                    notifier.success('Successful registration!');
                    $location.path('/login');
                }, function (err) {
                    notifier.error(err);
                });
        }
    };

    angular.module('app.controllers')
        .controller('RegisterCtrl', ['$scope', '$location', 'authSrv', 'notifier', 'validationSrv', RegisterCtrl]);
} ());