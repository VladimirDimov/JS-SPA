app.filter('filterAvailable', function() {
	var currentUser = JSON.parse(localStorage.getItem('userInfo'));
			
	return function(items, isActive){
		if(!isActive){
			return items;
		}else{
			return items.filter(function(game){
				return game.State == 0 && currentUser.userName != game.FirstPlayerName;
			});
		};
	};
});