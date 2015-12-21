(function () {
	'use strict'

	function HomeCtrl($scope, homeSrv, driversSrv, toastr) {
		$scope.stats = {};
		homeSrv.getStats()
			.then(function (res) {
				$scope.stats = res;
			}, function (err) {
				toastr.error('Unable to load stats!');
				$scope.stats = {};
			});

		$scope.drivers = {};
		driversSrv.getDrivers(1, 10, {})
			.then(function (res) {
				$scope.drivers = res;
			});
	};

	angular.module('app.controllers')
		.controller('HomeCtrl', ['$scope', 'homeSrv', 'driversSrv', 'toastr', HomeCtrl]);
} ());