define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$mdDialog', 'base.services.dialog', '$mdToast', function($scope, $stateParams, Restangular, $mdDialog, DialogService, $mdToast) {
		$scope.selected = [];

		$scope.query = {
			order: '',
			limit: 10,
			page: 1
		};

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

		$scope.enrollments = [];

		var course = Restangular.one('courses', $stateParams.courseId);
		course.getList('enrollments').then(function(_enrollments) {
			angular.forEach(_enrollments, function(_enrollment) {
				_enrollment._enrollmentLevel = _enrollment.enrollmentLevel;
				$scope.enrollments.push(_enrollment);
			});
		});

		$scope.deleteEnrollments = function(selected) {
			var failed = 0;
			angular.forEach(selected, function(enrollment) {
				Restangular.one('enrollments', enrollment.enrollmentId).remove().then(function() {
					$scope.enrollments.splice($scope.enrollments.indexOf(enrollment), 1);
				}, function() {
					failed++;
				});
			});
			if(failed.length) {
				$mdToast.show($mdToast.simple().textContent('Failed to unenroll ' + failed + ' out of ' + selected.length + ' students.').position('top right'));
			} else {
				$mdToast.show($mdToast.simple().textContent('Successfully unenrolled all ' + selected.length + ' students.').position('top right'));
			}
			$scope.selected = [];
		};

		$scope.changeEnrollments = function(selected, targetEvent) {
			DialogService.showCustomDialog(['$scope', '$mdDialog', function($scope, $mdDialog) {
				$scope._enrollmentLevel;
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

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.check = function(enrollmentLevel) {
				$mdDialog.hide(enrollmentLevel);
			};
		}], 'src/modules/facts/courseOwner/course/partials/bulk.change.enrollment.dialog.tpl.html', angular.element(document.body), targetEvent,
			function(enrollmentLevel) {
				var failed = 0;
				var alteredEnrollment = {
					enrollmentLevel: enrollmentLevel
				};
				angular.forEach(selected, function(enrollment) {
					Restangular.one('enrollments', enrollment.enrollmentId).customPUT(alteredEnrollment).then(function(_enrollment) {
						enrollment.enrollmentLevel = _enrollment.enrollmentLevel;
						enrollment._enrollmentLevel = _enrollment.enrollmentLevel;
						enrollment.updateTime = _enrollment.updateTime;
					}, function() {
						failed++;
					});
				});
				if(failed.length) {
					$mdToast.show($mdToast.simple().textContent('Failed to change enrollments for ' + failed + ' out of ' + selected.length + ' students.').position('top right'));
				} else {
					$mdToast.show($mdToast.simple().textContent('Successfully changed enrollments for all ' + selected.length + ' students.').position('top right'));
				}
				$scope.selected = [];
			});
		};

		$scope.saveEnrollment = function(enrollment, targetEvent) {
			var confirm = $mdDialog.confirm()
				.title('Change enrollment level for ' + enrollment.student.firstName + ' ' + enrollment.student.lastName)
				.textContent('Change enrollment level for ' + enrollment.student.firstName + ' ' + enrollment.student.lastName + ' from ' + $scope.enrollmentLevels[enrollment.enrollmentLevel].value + ' to ' + $scope.enrollmentLevels[enrollment._enrollmentLevel].value + '?')
				.ariaLabel('Change enrollment')
				.targetEvent(targetEvent)
				.ok('Change')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				enrollment.saving = true;
				var alteredEnrollment = {
					enrollmentLevel: enrollment._enrollmentLevel
				};
				Restangular.one('enrollments', enrollment.enrollmentId).customPUT(alteredEnrollment).then(function(_enrollment) {
					enrollment.saving = false;
					enrollment.enrollmentLevel = _enrollment.enrollmentLevel;
					enrollment._enrollmentLevel = _enrollment.enrollmentLevel;
					enrollment.updateTime = _enrollment.updateTime;
					$mdToast.show($mdToast.simple().textContent('Changed enrollment level to ' + $scope.enrollmentLevels[_enrollment.enrollmentLevel].value).position('top right'));
				}, function() {
					enrollment.saving = false;
					enrollment._enrollmentLevel = enrollment.enrollmentLevel;
					$mdToast.show($mdToast.simple().textContent('Failed to change enrollment level.').position('top right'));
				});
			});
		};

		$scope.deleteEnrollment = function(enrollment) {
			event.stopPropagation();
			Restangular.one('enrollments', enrollment.enrollmentId).remove().then(function() {
				$scope.enrollments.splice($scope.enrollments.indexOf(enrollment), 1);
				$mdToast.show($mdToast.simple().textContent('Unenrolled ' + enrollment.student.firstName + ' ' + enrollment.student.lastName).position('top right'));
			}, function() {
				enrollment.unenrolling = false;
				enrollment.failed = true;
				$mdToast.show($mdToast.simple().textContent('Failed to unenroll ' + enrollment.student.firstName + ' ' + enrollment.student.lastName).position('top right'));
			});
		};
	}];
});