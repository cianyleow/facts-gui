define([], function() {
	'use strict';
	return ['$scope', '$state', '$log', '$mdSidenav', 'base.services.token', function($scope, $state, $log, $mdSidenav, TokenService) {
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
		$scope.logout = function() {
			$log.debug('Logging out user');
			TokenService.clear();
			$state.go('authorize');
		};
	}];
});