app.factory('articlesService', function ($http, $q, globalConstants) {
	return {
		add: function (title, content) {
			var defered = $q.defer();
			var address = globalConstants.baseAddress + 'api/articles';
			var articleToPost = {
				Title: title,
				Content: content
			}

			var userInfo = JSON.parse(localStorage.userInfo);

			$http.post(address, articleToPost, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + userInfo.token
				}
			}).success(function (data) {
				defered.resolve(data);
			}).error(function (data) {
				defered.reject(data);
			});

			return defered.promise;
		},
		getAll: function () {
			var defered = $q.defer();
			var address = globalConstants.baseAddress + 'api/articles';
			$http.get(address)
				.success(function (res) {
					defered.resolve(res);
				}).error(function (err) {
					defered.reject(err);
				});

			return defered.promise;
		}
	}
});