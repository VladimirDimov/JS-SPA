app.controller('AuthCtrl', function ($scope, $location) {
	$scope.$watch(function () {
		return localStorage.userInfo
	}, function () {
		if (!localStorage.userInfo) {
			$scope.isLogged = false;
		} else {
			$scope.isLogged = true;
		}
	});

	$scope.logout = function logout() {
		localStorage.removeItem('userInfo');
		$location.path('/home');
	}
});