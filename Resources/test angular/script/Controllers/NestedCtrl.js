myApp.controller('NestedCtrl', function ($scope) {
    $scope.name = '';
    $scope.render = function () {
        $scope.name = $scope.firstName + ' ' + $scope.lastName;
    }
});
