app.controller('PlayCtrl', function ($scope, $interval, $location, playSrv, gamesSrv, toastr) {
	updateGame();
	$scope.gameResult = null;
	$scope.gameResult = null;
	$scope.isPlaying = false;
	$scope.game = {};

	$scope.playingStatus = function () {
		if ($scope.isPlaying) {
			return 'is-playing';
		} else {
			return 'is-not-playing';
		}
	}

	$scope.$watch(function () {
		if ($scope.game) {
			$scope.isPlaying = $scope.game.State < 3;
		} else {
			$scope.isPlaying = false;
		}
	}, function () {
		if ($scope.game) {
			$scope.isPlaying = $scope.game.State < 3;
		} else {
			$scope.isPlaying = false;
		}
	})

	$interval(updateGame, 3000);

	function updateGame() {
		gamesSrv.getMyGame()
			.then(function (res) {
				if (res != null) {
					$scope.board = res.Board;
					$scope.game = res;
					localStorage.setItem('gameId', res.Id);
					$scope.gameResult = gamesSrv.handleState(res.State);
					console.log($scope.gameResult);
				}
			}, function (err) {
				toastr.error(err);
			});
	};

	$scope.play = function (row, col) {
		playSrv.play(row, col)
			.then(function (res) {
				updateGame();
			}, function (err) {
				toastr.error(err);
			});
	};

	$scope.leave = function () {
		gamesSrv.leave()
			.then(function (res) {
				toastr.success(res);
				localStorage.removeItem('gameId');
			}, function (err) {
				toastr.error(err);
			});

		$location.path('/games');
	};

	$scope.formatSign = function (sign) {
		if (sign == '-') {
			return ' ';
		} else if (sign == 'X') {
			return 'X';
		} else {
			return 'O';
		}
	};

	$scope.restart = function restart() {
		gamesSrv.restart()
			.then(function (res) {
				toastr.success(res);
				updateGame();
			}, function (err) {
				toastr.error(err);
			});
	};
});