define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$mdDialog', 'base.services.dialog', function($scope, $stateParams, Restangular, $mdDialog, DialogService) {
		var course = Restangular.one('courses', $stateParams.courseId);
		$scope.course = course.get().$object;
		$scope.assignments = course.getList('assignments').$object;
		$scope.courseOwners = course.getList('courseOwners').$object;
		$scope.markers = course.getList('markers').$object;
		$scope.students = course.getList('students').$object;
		$scope.announcements = course.getList('announcements').$object;

		$scope.newAnnouncement = function(targetEvent) {
			DialogService.showCustomDialog(['$scope', '$mdDialog', function($scope, $mdDialog) {
					$scope.announcement = {};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};

					$scope.check = function(announcement) {
						$mdDialog.hide(announcement);
					};
				}], 'src/modules/facts/courseOwner/course/partials/new.announcementDialog.tpl.html', angular.element(document.body), targetEvent,
				function(announcement) {
					Restangular.one('courses', $stateParams.courseId).all('announcements').post(announcement).then(function(_announcement) {
						$scope.announcements.push(_announcement);
					}, function(_error) {

					});
				}, function() {
					// Closed
				});
		};
	}];
});