define([], function() {
	'use strict';
	return ['$scope', 'Restangular', function($scope, Restangular) {
		$scope.notifications = Restangular.one('self').getList('notifications').$object;

		$scope.announcementCourses = [];
		Restangular.one('self').getList('enrolledCourses').then(function(enrolledCourses) {
			angular.forEach(enrolledCourses, function(enrolledCourse) {
				Restangular.one('courses', enrolledCourse.courseId).get().then(function(course) {
					$scope.announcementCourses.push(course);
				});
			});
		});

		$scope.toggleFiltering = function() {
			if($scope.notifications.length != 0) {
				$scope.filtering = !$scope.filtering;
			}
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