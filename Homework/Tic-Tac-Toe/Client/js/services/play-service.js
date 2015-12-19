app.factory('playSrv', function ($http, $q, globalConstants, authSrv) {
	return {
		play: function (row, col) {
			var address = globalConstants.baseAddress + 'api/games/play';
			var userInfo = authSrv.getCurrentUserInfo();
			var data = {
				GameId: localStorage.getItem('gameId'),
				Row: row,
				Col: col
			};

			var deferred = $q.defer();
			$http.post(address, data, {
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
		}
	}
})