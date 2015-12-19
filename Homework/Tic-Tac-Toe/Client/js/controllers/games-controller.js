app.controller('GamesCtrl', function ($scope, gamesSrv, toastr, validationSrv, $location, playerVariables) {
	getAvailableGames();
	$scope.getAvailableGames = getAvailableGames;
	
	function getAvailableGames() {
		try {
			gamesSrv.allGames()
				.then(function (games) {
					$scope.games = games;
				}, function (err) {
					toastr.error(err);
				});
		} catch (error) {
			toastr.error(error);
		}
	};


	$scope.createGameMenuVisible = !$scope.hasGame;
	$scope.showHideButtonName = 'Create new game';

	$scope.showCreateGame = function showCreateGame() {
		$scope.createGameMenuVisible = !$scope.createGameMenuVisible;

		if (!$scope.createGameMenuVisible) {
			$scope.showHideButtonName = 'Create new game';
		} else {
			$scope.showHideButtonName = 'Hide';
		}
	};

	$scope.addGame = function addGame(newGameName) {
		try {
			validationSrv.validateCanNotBeNull(newGameName, 'Game name');
			validationSrv.validateLength(newGameName, 2, 15, 'Game name');
		} catch (error) {
			toastr.error(error);
			return;
		}
		gamesSrv.create(newGameName)
			.then(function (res) {
				toastr.success('Game created!');
				getAvailableGames();
				$scope.showCreateGame();
				$scope.newGameName = '';
				playerVariables.playerNumber = 1; //as first player who created the game;
				$location.path('/games/play');
			}, function (err) {
				toastr.error(err);
			});
	};

	$scope.canJoin = function (game) {
		var currentUser = JSON.parse(localStorage.getItem('userInfo'));
		return game.State == 0 &&
			currentUser.userName != game.FirstPlayerName;
	};

	$scope.join = function join(game) {
		gamesSrv.join(game)
			.then(function (res) {
				gamesSrv.setCurrentGameId(res);
				playerVariables.playerNumber = 2; // 2 as second player who joined;
				$location.path('/games/play');
				toastr.success("Game successfully joined");
			}, function (err) {
				toastr.error(err);
			});
	};

	$scope.hasGame = function () {
		if (localStorage.gameId) {
			return true;
		}

		return false;
	}
});