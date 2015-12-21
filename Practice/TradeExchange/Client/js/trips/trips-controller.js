(function () {
    'use strict';

    function TripsCtrl($scope, tripsSrv, $filter, $location) {
        $scope.showCreate = $location.path() == '/trips';

        tripsSrv.getLatestTrips()
            .then(function (res) {
                // var length = res.length;
                // for (var i = 0; i < length; i++) {
                //     res[i].departureDate = $filter('date')(res[i].departureDate, 'MMM d, y h:mm:ss a');
                // }
                $scope.trips = res;
            });
    };

    angular.module('app.controllers')
        .controller('TripsCtrl', ['$scope', 'tripsSrv', '$filter', '$location', TripsCtrl]);
} ());