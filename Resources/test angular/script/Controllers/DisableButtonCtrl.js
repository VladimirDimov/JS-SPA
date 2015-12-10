myApp.controller('DisableButtonCtrl', ['$scope', function($scope){
	$scope.IsDisabled = function(){
		if (!$scope.inputValue || $scope.inputValue.length == 0) {
			return true;
		}else{
			return false;
		}
	};
}]);