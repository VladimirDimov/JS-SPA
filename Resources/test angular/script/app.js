var myApp = angular.module('myApp', []);

myApp.directive('show', function() {
	return {
		link: function($scope, element, attributes) {
			$scope.$watch(attributes.show, function(value) {
				element.css('display', value ? 'block': 'none');
			});
		}
	};
});