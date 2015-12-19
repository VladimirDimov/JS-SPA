(function () {
	'user strict'

	function RegisterCtrl($scope, $location, authSrv, toastr, validationSrv) {
		$scope.user = {};
		$scope.register = function register() {
			try {
				validationSrv.validateEmail($scope.user.email);
				validationSrv.validatePassword($scope.user.password);
				validationSrv.validateConfirmPassword($scope.user.password, $scope.user.confirmPassword);
				validationSrv.validateCar($scope.user.isDriver, $scope.user.car);
			} catch (error) {
				toastr.error(error.message || error);
				return;
			}
			authSrv.register(
				$scope.user.email,
				$scope.user.isDriver,
				$scope.user.car,
				$scope.user.password,
				$scope.user.confirmPassword)
				.then(function (data) {
					toastr.success('Successful registration!');
					$location.path('/login');
				}, function (err) {
					toastr.error(err);
				});
		}
	};

	angular.module('app.controllers')
		.controller('RegisterCtrl', ['$scope', '$location', 'authSrv', 'toastr', 'validationSrv', RegisterCtrl]);
} ());