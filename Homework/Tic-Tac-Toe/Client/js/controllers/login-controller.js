app.controller('LoginCtrl', function ($scope,$location, authSrv, validationSrv, toastr) {
	$scope.login = function login() {
		authSrv
			.login($scope.user.username, $scope.user.password)
			.then(function (res) {
				toastr.success('Successful login!');
				authSrv.updateUserOnLocalStorage(res);
				$location.path('/home');
				
			}, function (err) {
				toastr.error(err);
			});
	};
});