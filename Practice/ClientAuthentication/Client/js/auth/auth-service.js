(function () {
	'use strict'

	function authSrv($http, $q, globalConstants) {
		function login(username, password) {
			var defered = $q.defer();
			var data = "grant_type=password&username=" + username + "&password=" + password;
			var address = globalConstants.baseAddress + 'Token';

			$http.post(address, data, {
				heders: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function (data) {
				defered.resolve(data);
			}).error(function (err) {
				defered.reject(err);
			});

			return defered.promise;
		};

		function register(username, email, password, confirmPassword) {
			var defered = $q.defer();
			var address = globalConstants.baseAddress + 'api/account/register';

			var data = {
				username: username,
				email: email,
				password: password,
				confirmPassword: confirmPassword
			};

			$http.post(address, data, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function (res) {
				defered.resolve(res);
			}).error(function (err) {
				defered.reject(err);
			});

			return defered.promise;
		};

		function updateUserOnLocalStorage(data) {
			localStorage.setItem('userInfo', JSON.stringify(data));
		};

		function logout() {
			localStorage.clear();
		};

		function getCurrentUserInfo() {
			var userInfo = JSON.parse(localStorage.getItem('userInfo'));
			return userInfo;
		}

		return {
			login: login,
			register: register,
			updateUserOnLocalStorage: updateUserOnLocalStorage,
			logout: logout,
			getCurrentUserInfo: getCurrentUserInfo
		}
	};

	angular.module('app.services')
		.factory('authSrv', ['$http', '$q', 'globalConstants', authSrv]);
} ());