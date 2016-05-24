define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$mdDialog', 'base.services.dialog', '$mdToast', function($scope, $stateParams, Restangular, $mdDialog, DialogService, $mdToast) {
		$scope.editCourse = false;

		var course = Restangular.one('courses', $stateParams.courseId).one('admin');
		$scope.course = course.get().$object;
		$scope.markers = course.getList('markers').$object;
		$scope.students = course.getList('students').$object;

		$scope.edit = function(course) {
			$scope.editCourse = true;
			$scope._course = angular.copy(course);
		};

		$scope.cancelEdit = function() {
			$scope.editCourse = false;
			$scope._course = undefined;
		};

		$scope.save = function(_course) {
			course.description = _course.description;
			course.put().then(function(_c) {
				$scope.editCourse = false;
				$scope._course = undefined;
				$scope.course = _c;
			}, function(_error) {
				$mdToast.show($mdToast.simple().textContent('Failed to update course description.').position('top right'));
				$scope._course = undefined;
				$scope.editCourse = false;
			});
		};

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
						$scope.course.announcements.push(_announcement);
					}, function(_error) {
						$mdToast.show($mdToast.simple().textContent('Failed to create announcement.').position('top right'));
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
				Restangular.one('announcements', announcement.announcementId).remove().then(function() {
					$scope.course.announcements.splice($scope.course.announcements.indexOf(announcement), 1);
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