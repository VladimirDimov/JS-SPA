myApp.controller('ToggleCtlr', function($scope) {
	$scope.toggle = function() {
		$scope.visible = !$scope.visible;
	}
});