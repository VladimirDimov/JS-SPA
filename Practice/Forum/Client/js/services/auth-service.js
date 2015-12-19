app.service('authService', function ($http, $q) {
	var baseUrl = 'http://localhost:1111/';

	var login = function (username, password) {
		var deferred = $q.defer();
		var data = "grant_type=password&username=" + username + "&password=" + password;

		$http.post(baseUrl + 'token', data, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function (data) {
			deferred.resolve(data);
			var userInfo = {
				username: data.userName,
				token: data.access_token,
				tokenType: data.token_type
			}
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
		}).error(function (data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};

	return {
		login: login
	}
});