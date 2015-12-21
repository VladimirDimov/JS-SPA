(function () {
    'use strict'

    function DriversCtrl($scope, driversSrv) {
        $scope.drivers;
        $scope.page = 1;

        $scope.updateSorter = function(val) {
            $scope.orderByVal = val;
        }

        $scope.prevPage = function nextPage() {
            $scope.page--;
        };

        $scope.nextPage = function prevPage() {
            $scope.page++;
        };

        driversSrv.getDrivers()
            .then(function (res) {
                $scope.drivers = res;
            });

        $scope.filterByName = function filter(filterVal, page) {
            driversSrv.filterByName(filterVal, page)
                .then(function (res) {
                    $scope.drivers = res;
                });
        };

        $scope.$watch('page', function () {
            $scope.filterByName($scope.filterValue, $scope.page);
        });
    };

    angular.module('app.controllers')
        .controller('DriversCtrl', ['$scope', 'driversSrv', DriversCtrl]);
} ());