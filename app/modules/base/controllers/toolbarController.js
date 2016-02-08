define([], function() {
	'use strict';
	return ['$scope', '$state', '$log', '$mdSidenav', function($scope, $state, $log, $mdSidenav) {
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
		$scope.logout = function() {
			$log.debug('Logging out user');
			// Do something here to log the person out.
			$state.go('authorize');
		};
	}];
});