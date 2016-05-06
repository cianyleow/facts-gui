define([], function() {
	'use strict';
	return ['$scope', 'base.services.authentication', '$stateParams', function($scope, AuthenticationService, $stateParams) {

		$scope.user = {};

		$scope.error = false;

		$scope.attempts = 0;

		$scope.states = [
			{
				enabled: $stateParams.redirect,
				icon: "link",
				message: "Redirecting to " + $stateParams.redirect + " after login."
			}, {
				enabled: $stateParams.logout,
				icon: "power_settings_new",
				message: "Logged out successfully."
			}
		];

		$scope.authenticate = function(user) {
			AuthenticationService.login(user, $scope.redirect, function(response){
				console.log('Authentication Error:' + response);
				$scope.error = true;
				$scope.attempts++;
			});
		};
	}];
});