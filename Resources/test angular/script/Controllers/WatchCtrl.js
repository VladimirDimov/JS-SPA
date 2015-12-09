myApp.controller('WatchCtrl', function($scope){
	$scope.greeting = $scope.$watch('name', function(newValue, oldValue){
		if (newValue.length != 0) {
			$scope.greeting = 'Hello ' + $scope.name;
		}else{
			$scope.greeting = '';
		}
	});
});