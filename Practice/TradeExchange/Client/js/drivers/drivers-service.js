(function () {
	'use strict'

	function driversSrv($scope) {
		return {
			getLastRegistered: function getLastRegistered($http, $q) {
				
			}
		};
	};

	angular.module('app.services')
		.factory('driversSrv', ['$http', '$q', driversSrv]);
} ());