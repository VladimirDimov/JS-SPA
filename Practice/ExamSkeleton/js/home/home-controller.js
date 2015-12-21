(function () {
	'use strict'

	function HomeCtrl($scope, homeSrv, driversSrv, toastr) {
		
	};

	angular.module('app.controllers')
		.controller('HomeCtrl', ['$scope', 'homeSrv', 'toastr', HomeCtrl]);
} ());