define([], function() {
	'use strict';
	return['$scope', 'Restangular', '$state', '$stateParams', '$q', 'base.services.file', 'base.services.piechart', 'facts.services.assignment', function($scope, Restangular, $state, $stateParams, $q, FileService, PieChartService, AssignmentService) {
		if(!AssignmentService.hasAssignmentForReview()) {
			$state.go('base.app.courseOwner.courses.details.assignments.new');
		}
		$scope.assignment = AssignmentService.getAssignmentForReview();
		$scope.markComponentData = PieChartService.getPieChartLines($scope.assignment.markComponents);
		$scope.markComponentOptions = {thickness: 30};
		
		$scope.create = function(assignment) {
			// Create assignment
			var baseAssignment = angular.copy(assignment);
			baseAssignment.suppliedFiles = undefined;
			Restangular.one('courses', $stateParams.courseId).all('assignments').post(baseAssignment).then(function(returnedAssignment) {
				var newAssignmentId = returnedAssignment.assignmentId;
				var fileUploadPromises = [];
				
				angular.forEach(assignment.suppliedFiles, function(suppliedFile) {
					fileUploadPromises.push(FileService.uploadFile('assignments/' + newAssignmentId + '/suppliedFiles', {file: suppliedFile.file}));
				});
				
				$q.all(fileUploadPromises).then(function(resp) {
					console.log(resp);
				}, function(fail) {
					console.log(fail);
				});
				
			});
			// Add requiredFiles
			
			// Add mark components
			
			// Upload files
			
//			var uploadAssignment = angular.copy(assignment);
//			uploadAssignment.suppliedFiles = undefined;
			
//			var formData = new FormData();
//			formData.append('refTemplateDTO', angular.toJson(uploadAssignment));
//			formData.append('file', assignment.suppliedFiles[0]);
//			$http.post('http://localhost:8080/assignments', formData, {
//				transformRequest: angular.identity,
//				headers: {'Content-Type': undefined }
//			});
			
//			Restangular.all('assignments').withHttpConfig({transformRequest: angular.identity}).customPOST(formData, undefined, undefined, {'Content-Type': undefined});
/*			
			console.log(assignmentData);
			FileService.uploadFile('assignments', new FormData(assignment), function(success) {
				
			}, function(error) {
				
			}, function(progress) {
				
			});*/
		};
	}];
});

/*
To do for file upload - encode everything else as JSON array and then add files afterwards.
On server side, have to allow for fact that files are being uploaded... feel like I need to change the request type.
Anyway, for later.


*/