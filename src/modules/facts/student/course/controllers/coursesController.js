define([], function() {
	'use strict';
	return['$scope', 'Restangular', '$mdToast', '$mdDialog', function($scope, Restangular, $mdToast, $mdDialog) {
		$scope.enrollments = [];
		Restangular.one('self').getList('enrollments').then(function(enrollments) {
			$scope.enrollments = enrollments;
			var courseIds = [];
			angular.forEach(enrollments, function(enrollment) {
				courseIds.push(enrollment.course.courseId);
			});
			Restangular.all('courses').getList().then(function(courses) {
				$scope.allCourses = [];
				angular.forEach(courses, function(course) {
					if(courseIds.indexOf(course.courseId) === -1) {
						$scope.allCourses.push(course);
					}
				});
			});
		});

		$scope.enroll = function(course, idx, event) {
			var confirm = $mdDialog.confirm()
				.title('Enroll in ' + course.shortName)
				.textContent('Are you sure you want to enroll in ' + course.shortName + ': ' + course.name + '?')
				.ariaLabel('Enroll in course')
				.targetEvent(event)
				.ok('Enroll')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				course.enrolling = true;
				course.failed = false;
				Restangular.one('courses', course.courseId).all('enrollments').post().then(function(_enrollment) {
					$scope.allCourses.splice(idx, 1);
					$scope.enrollments.push(_enrollment);
					$mdToast.show($mdToast.simple().textContent('Enrolled in ' + course.shortName + ': ' + course.name).position('top right'));
				}, function() {
					course.enrolling = false;
					course.failed = true;
					$mdToast.show($mdToast.simple().textContent('Failed to enroll in ' + course.shortName + ': ' + course.name).position('top right'));
				});
			});
		};
	}];
});