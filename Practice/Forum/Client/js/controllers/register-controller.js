(function() {
  app.controller('RegisterCtrl', function($scope, $http, toastr) {
    $scope.register = function register() {
      var vm = this;
      var user = vm.user || {};

      var registerRequestModel = {
        "Username": user.username,
        "Email": user.email,
        "Password": user.password,
        "ConfirmPassword": user.passwordRepeat
      }

      $http({
          method: 'POST',
          url: 'http://localhost:1111/api/users/register',
          data: registerRequestModel,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .success(function(data) {
          toastr.success('User ' + vm.user.username + ' registered!');
        })
        .error(function(data) {
          toastr.error(data.Message);
        })
    }
  });
}());
