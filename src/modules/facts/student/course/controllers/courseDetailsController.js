define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'facts.services.course', 'Restangular', '$mdDialog', '$mdToast', function($scope, $stateParams, CourseService, Restangular, $mdDialog, $mdToast) {
		$scope.course = CourseService.getCourse($stateParams.courseId);
		var course = Restangular.one('courses', $stateParams.courseId);
		course.one('enrollment').get().then(function(_enrollment) {
			$scope.enrollment = _enrollment;
			$scope.enrollment._enrollmentLevel = _enrollment.enrollmentLevel;
		});

		$scope.enrollmentLevels = {
			NO_CREDIT: {
				value: 'No credit',
				key: 'NO_CREDIT'
			},
			SUBMISSION_CREDIT: {
				value: 'Submission Credit',
				key: 'SUBMISSION_CREDIT'
			},
			EXAM_CREDIT: {
				value: 'Exam Credit',
				key: 'EXAM_CREDIT'
			}
		};

		$scope.cancelEnrollmentEdit = function(enrollment) {
			enrollment._enrollmentLevel = enrollment.enrollmentLevel;
			enrollment.edit = false;
		};

		$scope.saveEnrollment = function(enrollment, targetEvent) {
			if(enrollment.enrollmentLevel === enrollment._enrollmentLevel) {
				// Do nothing, just return
				return;
			}
			var confirm = $mdDialog.confirm()
				.title('Change enrollment level for ' + $scope.course.shortName)
				.textContent('Change your enrollment level in ' + $scope.course.shortName + ': ' + $scope.course.name + ' from ' + $scope.enrollmentLevels[enrollment.enrollmentLevel].value + ' to ' + $scope.enrollmentLevels[enrollment._enrollmentLevel].value + '?')
				.ariaLabel('Change enrollment')
				.targetEvent(targetEvent)
				.ok('Change')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				enrollment.changing = true;
				enrollment.failed = false;
				var alteredEnrollment = {
					enrollmentLevel: enrollment._enrollmentLevel
				};
				Restangular.one('enrollments', enrollment.enrollmentId).customPUT(alteredEnrollment).then(function(_enrollment) {
					enrollment.changing = false;
					enrollment.edit = false;
					$scope.enrollment = _enrollment;
					$scope.enrollment._enrollmentLevel = _enrollment.enrollmentLevel;
					$mdToast.show($mdToast.simple().textContent('Changed enrollment level to ' + $scope.enrollmentLevels[_enrollment.enrollmentLevel].value).position('top right'));
				}, function() {
					enrollment.changing = false;
					enrollment.edit = false;
					enrollment.failed = true;
					$mdToast.show($mdToast.simple().textContent('Failed to change enrollment level.').position('top right'));
				});
			}, function() {
				$scope.cancelEnrollmentEdit(enrollment);
			});
		};
	}];
});