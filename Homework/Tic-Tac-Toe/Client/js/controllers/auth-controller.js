app.controller('AuthCtrl', function ($scope, authSrv, $location) {
	$scope.$watch(function () { return localStorage.userInfo; }, function () {
		if (localStorage.userInfo) {
			$scope.isLogged = true;
		} else {
			$scope.isLogged = false;
		};
	});

	$scope.logout = function logout() {
		authSrv.logout();

		$location.path('/home');
	};

	$scope.$watch(function () { return localStorage.userInfo; }, function () {
		if (localStorage.userInfo) {
			var user = JSON.parse(localStorage.userInfo);
			$scope.username = user.userName;
		} else {
			$scope.username = null;
		};
	});
});