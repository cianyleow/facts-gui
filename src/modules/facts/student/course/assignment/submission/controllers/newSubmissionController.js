define([], function() {
	'use strict';
	return['$scope', '$q', '$mdDialog', '$state', '$stateParams', 'base.services.dialog', 'base.services.file', 'Restangular', 'facts.services.assignment', function($scope, $q, $mdDialog, $state, $stateParams, DialogService, FileService, Restangular, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);

		$scope.uploaded = false;
					
		$scope.submission = {
			comment: '',
			submissionFiles: []
		};

		$scope.action = function() {
			$state.go('base.app.courses.details.assignments.details.submissions.details', {submissionId: $scope._submission.submissionId});
		};
		
		$scope.removeSubmissionFile = function(targetEvent, submissionFile, index) {
			var confirm = $mdDialog.confirm().title('Remove Submission File')
			.textContent('Remove submission file: ' + submissionFile.file.name + '?')
			.ariaLabel('Remove submission file')
			.targetEvent(targetEvent)
			.ok('Remove')
			.cancel('Cancel');
			$mdDialog.show(confirm)
			.then(function() {
				$scope.submission.submissionFiles.splice(index, 1);
				submissionFile.file = undefined;
				$scope.assignment.requiredFiles.push(submissionFile);
			});
		};
		
		$scope.addSubmissionFile = function(targetEvent, requiredFile, index) {
			DialogService.showCustomDialog(function($scope, $mdDialog) {
				$scope.requiredFile = requiredFile;
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				
				$scope.add = function(file) {
					$mdDialog.hide(file);
				};
			}, 'src/modules/facts/student/course/assignment/submission/partials/new.submissionFileDialog.tpl.html', angular.element(document.body), targetEvent,
			function(file) {
				$scope.assignment.requiredFiles.splice(index, 1);
				requiredFile.file = file;
				$scope.submission.submissionFiles.push(requiredFile);
			}, function() {
				
			});
		};
		
		$scope.submit = function(submission, targetEvent) {
			$scope.error = undefined;
			$scope.canceler = $q.defer();
			var progress = {
				determinate: false
			};
			DialogService.showProgressDialog('Submission Upload', angular.element(document.body), targetEvent, function() {console.log('Cancelled');}, progress);

			var baseSubmission = angular.copy(submission);
			baseSubmission.submissionFiles = undefined;
			var fd = new FormData();
			fd.append('submission', JSON.stringify(baseSubmission));
			angular.forEach(submission.submissionFiles, function(submissionFile) {
				fd.append('files', submissionFile.file);
			});
			
			Restangular.one('assignments', $stateParams.assignmentId).all('submissions').withHttpConfig({timeout: $scope.canceler.promise, transformRequest: angular.identiy}).customPOST(fd, undefined, undefined, {'Content-Type': undefined}).then(function(_submission) {
				$scope._submission = _submission;
				$scope.canceler.reject();
				DialogService.cancelActiveDialog();
				$scope.uploaded = true;
			}, function(_error) {
				$scope.canceler.reject();
				$scope.error = {message: errorCodes[_error.status]};
				DialogService.cancelActiveDialog();
			});
		};

		var errorCodes = {
			413: 'Attachments are too large for upload. Max combined upload size is 10Mb.',
			500: 'Unspecified server error, please contact administrator.'
		};
	}];
});