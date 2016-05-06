define([], function() {
	'use strict';
	return['$scope', '$mdDialog', '$state', '$stateParams', 'Restangular', 'base.services.piechart', 'base.services.dialog', 'facts.services.assignment', function($scope, $mdDialog, $state, $stateParams, Restangular, PieChartService, DialogService, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignmentForReview();
		$scope.selectedTab = 0;

		$scope.reviewing = false;

		$scope.$watch('assignment.openTime', function(newValue, oldValue) {
			if(oldValue != newValue) {
				if(newValue > $scope.assignment.dueTime) {
					$scope.assignment.dueTime = newValue;
				}
			}
		});

		$scope.review = function(assignment) {
			AssignmentService.putAssignmentForReview(assignment);
			$state.go('base.app.courseOwner.courses.details.assignments.new.review');
		};

		$scope.removeLine = function(array, index) {
			array.splice(index, 1);
		};

		$scope.suppliedFileDialog = function(targetEvent) {
			DialogService.showCustomDialog(['$scope', '$mdDialog', function($scope, $mdDialog) {
				$scope.suppliedFile = {};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.check = function(suppliedFile) {
					$mdDialog.hide(suppliedFile);
				};
			}], 'src/modules/facts/courseOwner/course/assignment/partials/new.suppliedFileDialog.tpl.html', angular.element(document.body), targetEvent,
			function(suppliedFile) {
				$scope.assignment.suppliedFiles.push(suppliedFile);
			}, function() {

			});
		};
		$scope.markComponentDialog = function(targetEvent) {
			DialogService.showCustomDialog(['$scope', '$mdDialog', function($scope, $mdDialog) {
				$scope.markComponent = {};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.check = function(markComponent) {
					$mdDialog.hide(markComponent);
				};
			}], 'src/modules/facts/courseOwner/course/assignment/partials/new.markComponentDialog.tpl.html', angular.element(document.body), targetEvent,
			function(markComponent) {
				$scope.assignment.markComponents.push(markComponent);
			}, function() {

			});
		};
		$scope.requiredFileDialog = function(targetEvent) {
			DialogService.showCustomDialog(['$scope', '$mdDialog', function($scope, $mdDialog) {
				$scope.fileName = '';
				$scope.requiredFile = {maxFileSize: 1048576};
				$scope.$watch('fileName', function(newValue) {
					var parts = newValue.split('.');
					$scope.requiredFile.fileName = parts[0];
					if(parts.length == 2) {
						$scope.requiredFile.allowedExtension = parts[1];
					} else {
						$scope.requiredFile.allowedExtension = '';
					}
				});
				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.check = function(requiredFile) {
					$mdDialog.hide(requiredFile);
				};
			}], 'src/modules/facts/courseOwner/course/assignment/partials/new.requiredFileDialog.tpl.html', angular.element(document.body), targetEvent,
			function(requiredFile) {
				$scope.assignment.requiredFiles.push(requiredFile);
			}, function() {

			});
		};
	}];
});