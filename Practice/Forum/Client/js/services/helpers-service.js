app.factory('helpersService', function () {
	return {
		handleModelState: function (modelstate) {
			var response = [];
			for(var key in modelstate){
				response.push(modelstate[key]);
			}
			
			return response.join(', ');
		}
	}
})