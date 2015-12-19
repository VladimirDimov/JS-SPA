app.directive('mdPlaySquare', function() {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attributes) {
			elem.bind('click', function() {
				elem.html(' x ');
			});			
		}
	};
})