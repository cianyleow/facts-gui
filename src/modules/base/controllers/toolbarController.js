define([], function() {
	'use strict';
	return ['$scope', '$state', 'base.services.authentication', '$log', '$mdSidenav', 'base.services.token', '$mdDialog', 'Restangular', function($scope, $state, AuthenticationService, $log, $mdSidenav, TokenService, $mdDialog, Restangular) {
		var userInfo = TokenService.userInfo();

		$scope.userDetails = userInfo.userDetails.firstName + ' ' + userInfo.userDetails.lastName + ' (' + userInfo.userDetails.userName + ')';

		$scope.notifications = Restangular.one('self').getList('notifications').$object;
		
		$scope.logout = function() {
			$log.info('Logging out user');
			AuthenticationService.logout();
			$state.go('authorize', {logout: true});
		};
		
		$scope.changeRoleDialog = function(targetEvent) {
			// $mdDialog.show(
			// 	{
			// 		controller: function($scope, $mdDialog) {
			// 			$scope.roles = userInfo.roles;
			// 			$scope.currentRole = userInfo.currentRole;
			// 			$scope.cancel = function() {
			// 				$mdDialog.cancel();
			// 			};
			//
			// 			$scope.change = function(newRole) {
			// 				$mdDialog.hide(newRole);
			// 			};
			// 		},
			// 		templateUrl: 'src/modules/base/partials/role-change.dialog.tpl.html',
			// 		parent: angular.element(document.body),
			// 		targetEvent: targetEvent,
			// 		clickOutsideToClose: true
			// 	}
			// ).then(
			// 	function(newRole) {
			// 		console.log(newRole);
			// 		userInfo.currentRole = newRole;
			// 	}, function() {
			//
			// 	}
			// );
		};

		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
	}];
});