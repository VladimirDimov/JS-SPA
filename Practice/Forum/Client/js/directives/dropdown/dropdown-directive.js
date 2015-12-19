app.directive('mdDropdown', function () {
	return {
		restrict: 'AE',
		replace: true,
		require: 'ngModel',
		link: function (scope, element, attributes) {
			element.autocomplete({
				source: scope[attributes.data]
			});
		}
	};
});