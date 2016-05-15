define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$mdDialog', 'base.services.dialog', '$mdToast', function($scope, $stateParams, Restangular, $mdDialog, DialogService, $mdToast) {
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
				});
		};

		$scope.deleteAnnouncement = function(announcement, event) {
			var confirm = $mdDialog.confirm()
				.title('Delete "' + announcement.title + '" announcement?')
				.textContent('Are you sure you want to delete the announcement "' + announcement.title + ' (ID: ' + announcement.announcementId + ')?')
				.ariaLabel('Delete announcement')
				.targetEvent(event)
				.ok('Delete')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				announcement.deleting = true;
				announcement.failed = false;
				Restangular.one('courses', $stateParams.courseId).one('announcements', announcement.announcementId).remove().then(function() {
					$scope.announcements.splice($scope.announcements.indexOf(announcement), 1);
					$mdToast.show($mdToast.simple().textContent('Deleted "' + announcement.title + '" announcement.').position('top right'));
				}, function() {
					announcement.deleting = false;
					announcement.failed = true;
					$mdToast.show($mdToast.simple().textContent('Failed to delete "' + announcement.title + '" announcement.').position('top right'));
				});
			});
		}
	}];
});