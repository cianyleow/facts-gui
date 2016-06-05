define([], function() {
	'use strict';
	return ['$scope', 'Restangular', function($scope, Restangular) {
		$scope.notifications = Restangular.one('self').getList('notifications').$object;

		$scope.toggleFiltering = function() {
			if($scope.notifications.length != 0) {
				$scope.filtering = !$scope.filtering;
			}
		};

		$scope.viewNotification = function(notification) {
			Restangular.one('self').one('notifications', notification.notificationId).put().then(function(_notification) {
				$scope.notifications[$scope.notifications.indexOf(notification)] = _notification;
				notification = _notification;
			});
			$location.path(notification.link); //  Redirect regardless of outcome.
		};

		$scope.markAllRead = function() {
			angular.forEach($scope.notifications, function(notification) {
				Restangular.one('self').one('notifications', notification.notificationId).put().then(function(_notification) {
					$scope.notifications[$scope.notifications.indexOf(notification)] = _notification;
					notification = _notification;
				});
			});
		};
	}];
});