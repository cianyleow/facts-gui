define([], function() {
	'use strict';
	return ['$scope', '$state', 'base.services.authentication', '$log', '$mdSidenav', 'base.services.token', '$mdDialog', function($scope, $state, AuthenticationService, $log, $mdSidenav, TokenService, $mdDialog) {
		var userInfo = TokenService.userInfo();

		$scope.userDetails = userInfo.userDetails.firstName + ' ' + userInfo.userDetails.lastName + ' (' + userInfo.userDetails.userName + ')';

		$scope.actions = [
			{
				icon: 'person',
				description: 'Change Role',
				action: function(targetEvent) {
					$mdDialog.show(
						{
							controller: function($scope, $mdDialog) {
								$scope.roles = userInfo.roles;
								$scope.currentRole = userInfo.currentRole;
								$scope.cancel = function() {
									$mdDialog.cancel();
								};

								$scope.change = function(newRole) {
									$mdDialog.hide(newRole);
								};
							},
							templateUrl: 'src/modules/base/partials/role-change.dialog.tpl.html',
							parent: angular.element(document.body),
							targetEvent: targetEvent,
							clickOutsideToClose: true
						}
					).then(
						function(newRole) {
							console.log(newRole);
							userInfo.currentRole = newRole;
						}, function() {

						}
					);
				}
			},
			{
				icon: 'power_settings_new',
				description: 'Logout',
				action: function() {
					$log.info('Logging out user');
					AuthenticationService.logout();
					$state.go('authorize', {logout: true});
				}
			}
		];

		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
	}];
});