app.controller('LoginCtrl', function ($scope, $location, toastr, authService) {
	$scope.user = {
		username: "",
		password: "",
	};

	$scope.login = function login() {
		var promise = authService.login($scope.user.username, $scope.user.password);
		promise.then(function (data) {
			toastr.success('User ' + $scope.user.username + ' logged in!');
			$location.path('/home');
		}, function (err) {
			toastr.error(err.error_description);
		})
	}
});