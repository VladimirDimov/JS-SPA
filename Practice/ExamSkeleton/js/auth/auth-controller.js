(function () {
	function AuthCtrl($scope, authSrv, $location, toastr) {
		$scope.$watch(function () { return localStorage.userInfo; }, function () {
			if (localStorage.userInfo) {
				$scope.isLogged = true;
			} else {
				$scope.isLogged = false;
			};
		});

		$scope.logout = function logout() {
			authSrv.logout()
				.then(function (res) {
					toastr.success("Successful log out!")
				}, function (err) {
					toastr.error(err);
				});

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
	};
	angular.module('app.controllers')
		.controller('AuthCtrl', ['$scope', 'authSrv', '$location', 'toastr', AuthCtrl]);
} ());