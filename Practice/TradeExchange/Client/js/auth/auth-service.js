(function () {
	'use strict'

	function authSrv($http, $q, globalConstants, md5) {
		function login(email, password) {
			var defered = $q.defer();
			var data = "grant_type=password&username=" + email + "&password=" + md5.createHash(password || '');
			var address = globalConstants.baseAddress + 'api/users/login?';

			$http.post(address, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function (data) {
				defered.resolve(data);
			}).error(function (err) {
				defered.reject(err);
			});

			return defered.promise;
		};

		function register(email, isDriver, car, password, confirmPassword) {
			var defered = $q.defer();
			var address = globalConstants.baseAddress + 'api/users/register';

			var data = {
				Email: email,
				IsDriver: isDriver,
				Car: car,
				Password: md5.createHash(password || ''),
				ConfirmPassword: md5.createHash(confirmPassword || '')
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
		.factory('authSrv', ['$http', '$q', 'globalConstants', 'md5', authSrv]);
} ());