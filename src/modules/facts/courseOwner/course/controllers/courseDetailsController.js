define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$mdDialog', 'base.services.dialog', '$mdToast', function($scope, $stateParams, Restangular, $mdDialog, DialogService, $mdToast) {
		$scope.editCourse = false;

		var course = Restangular.one('courses', $stateParams.courseId).one('admin');
		$scope.course = course.get().$object;

		$scope.edit = function(course) {
			$scope.editCourse = true;
			$scope._course = angular.copy(course);
		};

		$scope.cancelEdit = function() {
			$scope.editCourse = false;
			$scope._course = undefined;
		};

		$scope.save = function(_course) {
			var originalDescription = course.description;
			course.description = _course.description;
			course.put().then(function(_c) {
				$scope.editCourse = false;
				$scope._course = undefined;
				$scope.course = _c;
			}, function() {
				$mdToast.show($mdToast.simple().textContent('Failed to update course description.').position('top right'));
				course.description = originalDescription;
				$scope._course = undefined;
				$scope.editCourse = false;
			});
		};

		$scope.openAddMarkerDialog = function(targetEvent) {
			DialogService.showCustomDialog(['$scope', '$mdDialog', function($scope, $mdDialog) {
					$scope.newMarkers = [];

					$scope.allMarkers = [];
					course.one('markers').getList('available').then(function(_markers) {
						angular.forEach(_markers, function(_marker) {
							_marker.lowerName = (_marker.firstName + ' ' + _marker.lastName).toLowerCase();
							_marker.userName = _marker.userName.toLowerCase();
							$scope.allMarkers.push(_marker);
						});
					});

					$scope.querySearch = function(query) {
						var results = query ? $scope.allMarkers.filter(createFilterFor(query)) : [];
						return results;
					};

					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(marker) {
							return (marker.lowerName.indexOf(lowercaseQuery) === 0) || (marker.userName.indexOf(lowercaseQuery) === 0);
						}
					}

					$scope.cancel = function() {
						$mdDialog.cancel();
					};

					$scope.check = function(newMarkers) {
						$mdDialog.hide(newMarkers);
					};
				}], 'src/modules/facts/courseOwner/course/partials/add.markerDialog.tpl.html', angular.element(document.body), targetEvent,
				function(newMarkers) {
					angular.forEach(newMarkers, function(marker) {
						course.all('markers').post(marker).then(function(_marker) {
							$scope.course.markers.push(_marker);
						});
					})
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
					}, function() {
						$mdToast.show($mdToast.simple().textContent('Failed to create announcement.').position('top right'));
					});
				});
		};

		$scope.deleteAnnouncement = function(announcement) {
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
		};
	}];
});