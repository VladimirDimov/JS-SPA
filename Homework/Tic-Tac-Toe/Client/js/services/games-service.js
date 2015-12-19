app.factory('gamesSrv', function ($http, $q, globalConstants, authSrv, validationSrv, playerVariables) {
	return {
		allGames: function () {
			var deferred = $q.defer();
			var address = globalConstants.baseAddress + 'api/games/all';
			var userInfo = authSrv.getCurrentUserInfo();

			if (!userInfo) {
				throw 'User not logged in!';
			}

			$http.get(address, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		create: function (gameName) {
			var deferred = $q.defer();
			var address = globalConstants.baseAddress + 'api/games/create';
			var userInfo = authSrv.getCurrentUserInfo();
			var game = {
				Name: gameName
			};
			$http.post(address, game, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		join: function (game) {
			var deferred = $q.defer();
			var address = globalConstants.baseAddress + 'api/games/join?id=' + game.Id;
			var userInfo = authSrv.getCurrentUserInfo();

			// if (playerVariables.playerNumber != 0) {
			// 	deferred.reject('You have active games');
			// 	return deferred.promise;	
			// };

			$http.post(address, null, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		setCurrentGameId: function (id) {
			localStorage.setItem('gameId', id);
		},
		getById: function (id) {
			var address = globalConstants.baseAddress + 'api/games/getById?gameId=' + id;
			var userInfo = authSrv.getCurrentUserInfo();
			var deferred = $q.defer();

			$http.get(address, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token,
					'Content-Type': 'application/json'
				}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		handleState: function (state) {
			var playerNumber = playerVariables.playerNumber;

			if (state == 0) {
				return 'Waiting for opponent to join the game!';
			} else if (state == 1) {
				if (playerNumber == 1) {
					return "It's your turn";
				} else {
					return "Waiting for opponent to play...";
				};
			} else if (state == 2) {
				if (playerNumber == 2) {
					return "It's your turn";
				} else {
					return "Waiting for opponent to play...";
				};
			} else if (state == 3) {
				if (playerNumber == 1) {
					return 'You won the game!';
				} else {
					return 'You loose!';
				};
			} else if (state == 4) {
				if (playerNumber == 2) {
					return 'You won the game!';
				} else {
					return 'You loose!';
				};
			} else if (state == 5) {
				return 'Draw game!';
			} else if (state == 6) {
				return 'Game is finished!';
			}
		},
		leave: function () {
			var deferred = $q.defer();
			var userInfo = authSrv.getCurrentUserInfo();

			// if (!localStorage.gameId) {
			// 	localStorage.removeItem('gameId');
			// 	deferred.reject('Invalid game!');
			// 	return;
			// }

			var address = globalConstants.baseAddress + 'api/games/leave?gameId=' + localStorage.gameId;

			$http.put(address, null, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (err) {
				deferred.reject(err);
			});

			localStorage.removeItem('gameId');
			return deferred.promise;
		},
		hasGame: function () {
			var address = globalConstants.baseAddress + 'api/users/hasGame';
			var userInfo = authSrv.getCurrentUserInfo();
			var deferred = $q.defer();

			$http.get(address, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getMyGame: function () {
			var address = globalConstants.baseAddress + 'api/games/getMyGame';
			var userInfo = authSrv.getCurrentUserInfo();
			var deferred = $q.defer();

			$http.get(address, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		restart: function () {
			var defered = $q.defer();
			var address = globalConstants.baseAddress + 'api/games/restart';
			var userInfo = authSrv.getCurrentUserInfo();

			$http.put(address, null, {
				headers: {
					'Authorization': 'Bearer ' + userInfo.access_token
				}
			}).success(function (res) {
				defered.resolve(res);
			}).error(function (err) {
				defered.reject(err);
			});

			return defered.promise;
		}
	};
});