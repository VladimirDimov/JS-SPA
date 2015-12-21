(function () {
	'use strict'

	function homeSrv($http, $q, globalConstants) {
		return {
			
		}
	};

	angular.module('app.services')
		.factory('homeSrv', ['$http', '$q', 'globalConstants', 'authSrv', homeSrv])
} ());