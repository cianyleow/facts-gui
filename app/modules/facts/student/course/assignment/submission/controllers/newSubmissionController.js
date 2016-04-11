define([], function() {
	'use strict';
	return['$scope', '$mdDialog', '$state', '$stateParams', 'base.services.dialog', 'base.services.file', 'Restangular', 'facts.services.submission', '$q', function($scope, $mdDialog, $state, $stateParams, DialogService, FileService, Restangular, SubmissionService, $q) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
					
		$scope.submission = {
			comment: '',
			submissionFiles: []
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
				$scope.requiredFiles.push(submissionFile);
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
			}, 'modules/facts/student/course/assignment/submission/partials/new.submissionFileDialog.tpl.html', angular.element(document.body), targetEvent,
			function(file) {
				$scope.requiredFiles.splice(index, 1);
				requiredFile.file = file;
				$scope.submission.submissionFiles.push(requiredFile);
			}, function() {
				
			});
		};
		
		$scope.submit = function(submission) {
			console.log(submission);
			var baseSubmission = angular.copy(submission);
			baseSubmission.submissionFiles = undefined;
			Restangular.one('assignments', $stateParams.assignmentId).all('submissions').post(baseSubmission).then(function(_submission) {
				var newSubmissionId = _submission.submissionId;
				var fileUploadPromises = [];
				
				angular.forEach(submission.submissionFiles, function(submissionFile, index) {
					fileUploadPromises.push(FileService.uploadFile('submissions/' + newSubmissionId + '/requiredFiles/' + submissionFile.fileRequirementId, {file: submissionFile.file}));
				});
				
				$q.all(fileUploadPromises).then(function(resp) {
					console.log("submitting:" +resp);
					_submission.submittedFiles = [];
					angular.forEach(resp, function(submittedFile) {
						_submission.submittedFiles.push({fileId: submittedFile.data.fileId});
					});
					Restangular.one('submissions', newSubmissionId).all('validate').post(_submission).then(function(success) {
						console.log(success.submissionStatus);
					});
				}, function(fail) {
					console.log(fail);
				});
				
			});
			
			// Send XML submission to get creation time, then upload files.
			
			// Cycle through file uploads and get back file IDs
			
			// Send through initial submission, file IDs/requirment IDs and if all is okay, update assignment to correctly submitted. Otherwise report failure.
			
	/*		$scope.errorMessages = [];
			$scope.submitting = true;
			$scope.submitted = false;
			
			$scope.submission.files = [];
			
			// Upload files and get back fileIds
			angular.forEach($scope.requiredFiles, function(file) {
				$scope.submission.files.push(file.selectedFile);
			});
			SubmissionService.uploadNewSubmission(
				$scope.submission, 
				function(resp) {
					console.log("Finished submission");
					$scope.submitted = true;
					$scope.timeLeft = 3;
					redirectPage(resp.data.submissionId);
				},
				function(resp) {
					$scope.errorMessages.push(resp.message);
					DialogService.showErrorDialog('Submission Upload Error', 'There has been an error while uploading your submission. Please review and try again.');
					$scope.submitted = false;
				}
			);*/
		};
	}];
});