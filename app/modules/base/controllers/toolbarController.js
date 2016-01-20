define([], function() {
	'use strict';
	return ['$scope', '$state', '$log', '$mdSidenav', function($scope, $state, $log, $mdSidenav) {
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};		
	}];
});