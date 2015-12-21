(function () {
	'use strict'

	function homeSrv($http, $q, globalConstants) {
		return {
			getStats: function () {
				var defered = $q.defer();
				var address = globalConstants.baseAddress + 'api/stats';

				$http.get(address)
					.success(function (res) {
						defered.resolve(res);
					}).error(function (err) {
						defered.reject("Unable to get stats!");
					});

				return defered.promise;
			}
		}
	};

	angular.module('app.services')
		.factory('homeSrv', ['$http', '$q', 'globalConstants', 'authSrv', homeSrv])
} ());