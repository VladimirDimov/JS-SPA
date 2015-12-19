app.directive('mdShowForLogged', function () {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attributes) {
			scope.$watch(function () { return localStorage.userInfo; }, function () {
				if (attributes.mdShowForLogged == 'true' || attributes.mdShowForLogged == '') {
					if (!localStorage.userInfo) {
						elem.css('display', 'none');
					}else {
						elem.css('display', '');
					};
				} else if (attributes.mdShowForLogged == 'false') {
					if (localStorage.userInfo) {
						elem.css('display', 'none');
					}else {
						elem.css('display', '');
					};
				};
			});
		}
	};
});