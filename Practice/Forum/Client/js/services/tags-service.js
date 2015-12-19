app.factory('tagsService', function ($http, $q, globalConstants) {
	var defered = $q.defer();

	var address = globalConstants.baseAddress + 'tags';
	$http.get(address)
		.success(function (data) {
			defered.resolve(data)
		}).error(function (data) {
			defered.reject(data);
		});

	return defered.promise;
});