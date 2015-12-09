myApp.controller('IncrementCtrl', function($scope){
	$scope.value = 0;
	
	$scope.add = function(increment){
		$scope.value += increment;
	};
});