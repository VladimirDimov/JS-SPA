(function () {
    'use strict';

    function CreateTrip($scope, tripsSrv, toastr) {
        $scope.create = function create(trip) {
            tripsSrv.create(trip)
                .then(function (res) {
                    toastr.success("Trip created");
                }, function (err) {
                    toastr.error(err);
                });
        };
    };

    angular.module('app.controllers')
        .controller('CreateTripCtrl', ['$scope', 'tripsSrv', 'toastr', CreateTrip]);
} ());