(function () {
	'use strict'

	function validationService() {
		function validateLength(input, minLength, maxLength, name) {
			if (input.length < minLength) {
				throw name + ' must be at least ' + minLength + ' characters';
			}

			if (input.length > maxLength) {
				throw name + ' must be at most ' + maxLength + ' characters';
			}
		};

		function validateCanNotBeNull(input, name) {
			if (!input) {
				throw name + ' cannot be empty!';
			}
		};

		function validateUsername(username) {
			validateCanNotBeNull(username, 'Username');
			var pattern = new RegExp('^[A-z\d_]+$');
			validateLength(username, 3, 10, 'Username');
			if (!pattern.test(username)) {
				throw 'Username can contain only digits letters and underscores!';
			};
		};

		function validatePassword(password, minLength, maxLenngth) {
			validateCanNotBeNull(password, 'Password');
			validateLength(password, 6, 100, 'Password');
		};

		function validateConfirmPassword(password, confirmation) {
			if (password != confirmation) {
				throw "Password doesen't match the confirmation! Both fields must be equal!";
			}
		}

		function validateEmail(email, minLength, maxLength) {
			var pattern = new RegExp('^.+@[A-z]+\..+$');
			validateCanNotBeNull(email, 'Email');
			if (!pattern.test(email)) {
				throw 'Invalid email format!';
			};
		};

		function validateCar(isDriver, car) {
			if (isDriver && !car) {
				throw "Drivers must declare car model!";
			}
		}

		return {
			validateLength: validateLength,
			validateCanNotBeNull: validateCanNotBeNull,
			validateUsername: validateUsername,
			validatePassword: validatePassword,
			validateEmail: validateEmail,
			validateConfirmPassword: validateConfirmPassword,
			validateCar: validateCar
		};
	};

	angular.module('app.services')
		.factory('validationSrv', [validationService]);
} ());