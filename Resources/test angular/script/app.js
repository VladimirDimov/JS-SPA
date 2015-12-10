var myApp = angular.module('myApp', []);

myApp.directive('show', function() {
	return {
		link: function($scope, element, attributes) {
			$scope.$watch(attributes.show, function(value) {
				element.css('display', value ? 'block' : 'none');
			});
		}
	};
});

myApp.directive('clickColor', function() {
	return {
		link: function($scope, element, attributes) {
			element.on('click', function(color) {
				element.css('background-color', attributes.clickColor);
			});
		}
	};
});

myApp.directive('repeateTimes', function() {
	// Runs during compile
	return {
		link: function($scope, elem, attr, controller) {

			var elementsToRepeate = elem.children();
			for (var i = 0; i < attr.repeateTimes; i++) {
				$(elem).append(elementsToRepeate.clone());
			};
		}
	};
});