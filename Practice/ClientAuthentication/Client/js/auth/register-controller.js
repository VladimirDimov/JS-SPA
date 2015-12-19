(function () {
	'user strict'

	function RegisterCtrl($scope, authSrv, toastr, validationSrv) {
		$scope.user = {};
		$scope.register = function register() {
			try {
				validationSrv.validateUsername($scope.user.username);
				validationSrv.validateEmail($scope.user.email);
				validationSrv.validatePassword($scope.user.password);
			} catch (error) {
				toastr.error(error.message || error);
				return;
			}
			authSrv.register(
				$scope.user.username,
				$scope.user.email,
				$scope.user.password,
				$scope.user.confirmPassword)
				.then(function (data) {
					toastr.success('Successful registration!');
				}, function (err) {
					toastr.error(err);
				});
		}
	};

	angular.module('app.controllers')
		.controller('RegisterCtrl', ['$scope', 'authSrv', 'toastr', 'validationSrv', RegisterCtrl]);
} ());