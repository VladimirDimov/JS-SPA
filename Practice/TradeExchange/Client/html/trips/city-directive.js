(function () {
    'use strict';

    function mdCities(dataSrv) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/html/trips/city-dropdown.html',
            scope: {},
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                scope.cities;
                dataSrv.get('api/cities')
                    .then(function (res) {
                        scope.cities = res;
                        scope.label = attr.label;
                    });

                scope.$watch('selectedCity', function () {
                    ngModel.$setViewValue(scope.selectedCity);
                });
            }
        };
    };

    angular.module('app.directives')
        .directive('mdCities', ['dataSrv', mdCities]);
} ());