app.controller('ArticlesCtrl', function ($scope, $route, articlesService, toastr, helpersService) {
	$scope.add = function add() {
		articlesService.add($scope.title, $scope.content)
			.then(function (data) {
				toastr.success('Article added!');
				$route.reload();
			}, function (err) {
				toastr.error(helpersService.handleModelState(err.ModelState));
			});
	};

	$scope.cancel = function cancel() {
		$scope.showAddNew = false;
	};

	$scope.articles = articlesService
		.getAll()
		.then(function (data) {
			$scope.articles = data;
		});

	$scope.showAddNew = false;

	$scope.addNew = function () {
		$scope.showAddNew = true;
	}

	$scope.names = ['pesho', 'gosho', 'stamat'];

	$scope.isAddTagDisabled = true;
	$scope.$watch('tagToAdd', function () {
		if ($scope.tagToAdd) {
			$scope.isAddTagDisabled = false;
		} else {
			$scope.isAddTagDisabled = true;
		}
	});
	
	$scope.tagNames = ['a', 'b'];
});