myApp.factory('UsersSrvc', function() {
	var users = ['Pesho', 'Gosho', 'Stamat'];
	return {
		all: function() {
			return users;
		}
	};
});