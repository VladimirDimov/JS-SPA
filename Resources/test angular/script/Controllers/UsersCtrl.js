myApp.controller('UsersCtrl', function($scope, UsersSrvc){
	$scope.users = UsersSrvc.all();
});