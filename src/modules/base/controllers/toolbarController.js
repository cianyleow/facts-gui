define([], function() {
	'use strict';
	return ['$scope', 'base.services.authentication', '$log', '$mdSidenav', 'base.services.token', function($scope, AuthenticationService, $log, $mdSidenav) {
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
		$scope.logout = function() {
			$log.debug('Logging out user');
			AuthenticationService.logout();
		};
	}];
});