define([], function() {
	'use strict';
	return['$scope', 'Restangular', '$mdToast', '$mdDialog', function($scope, Restangular, $mdToast, $mdDialog) {
		$scope.enrolledCourses = [];
		Restangular.one('self').getList('enrollments').then(function(courses) {
			$scope.enrolledCourses = courses;
			var courseIds = [];
			angular.forEach(courses, function(course) {
				courseIds.push(course.courseId);
			});
			Restangular.all('courses').getList().then(function(courses) {
				angular.forEach(courses, function(course) {
					if(courseIds.indexOf(course.courseId) > -1) {
						course.enrolled = true;
					}
				});
				$scope.allCourses = courses;
			});
		});

		$scope.enroll = function(course, idx, event) {
			var confirm = $mdDialog.confirm()
				.title('Enroll in ' + course.shortName)
				.textContent('Are you sure you want to enroll in ' + course.shortName + ": " + course.name + '?')
				.ariaLabel('Enroll in course')
				.targetEvent(event)
				.ok('Enroll')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				Restangular.one('courses', course.courseId).all('enrollments').post().then(function(_enrollment) {
					$scope.enrolledCourses.push(course);
					$scope.allCourses[idx].enrolled = true;
					$mdToast.show($mdToast.simple().textContent('Enrolled in ' + course.shortName + ": " + course.name).position('top right'));
				}, function(error) {
					$mdToast.show($mdToast.simple().textContent('Failed to enroll in ' + course.shortName + ": " + course.name).position('top right'));
				});
			});
		};
	}];
});