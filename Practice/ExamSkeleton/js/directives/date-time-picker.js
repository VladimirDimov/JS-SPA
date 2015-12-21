(function () {
    'use strict';

    function mdDateTime() {
        return {
            restrict: 'A',
            link: function (elem) {
                elem.kendoDateTimePicker();
            }
        }
    };

    angular.module('app.directives')
        .directive('mdDateTime', [mdDateTime])
} ());