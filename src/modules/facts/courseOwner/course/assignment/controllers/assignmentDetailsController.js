define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', 'base.services.piechart', '$mdDialog', '$mdToast', '$state', function($scope, $stateParams, Restangular, PieChartService, $mdDialog, $mdToast, $state) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
		$scope.suppliedFiles = assignment.getList('suppliedFiles').$object;

		$scope.submissions = assignment.getList('submissions').$object;

		$scope.query = {
			order: 'submitter.username',
			limit: 30,
			page: 1
		};
		
		$scope.assignMarkers = function(event) {
			assignment.all('feedback').post().then(function(_feedbacks) {
				console.log(_feedbacks);
				var mappedFeedback = [];
				angular.forEach(_feedbacks, function(_feedback) {
					mappedFeedback[_feedback.submission.submissionId] = _feedback;
				});
				console.log(mappedFeedback);
				angular.forEach($scope.submissions, function(submission) {
					submission.feedback = mappedFeedback[submission.submissionId];
				});
				$mdToast.show($mdToast.simple().textContent('Successfully assigned markers for assignment.').position('top right'));
			}, function(error) {
				$mdDialog.show($mdDialog.alert()
					.parent(angular.element(document.body))
					.clickOutsideToClose(true)
					.title('Marker Assignment Failed')
					.textContent('Marker assignment failed with error code ' + error.status + ' (' + error.data.message + ').')
					.ariaLabel('Marker assignment failed.')
					.ok('Close')
					.targetEvent(event)
				);
			});
		};

		$scope.previewActions = [
			{
				action: function(assignment, event) {
					var confirm = $mdDialog.confirm()
						.title('Delete Assignment')
						.textContent('Are you sure you want to delete assignment "' + assignment.name + '" (ID: ' + assignment.assignmentId + ')?')
						.ariaLabel('Delete assignment')
						.targetEvent(event)
						.ok('Delete')
						.cancel('Cancel');
					$mdDialog.show(confirm).then(function() {
						Restangular.one('assignments', assignment.assignmentId).remove().then(function() {
							$state.go('base.app.courseOwner.courses.details');
							$mdToast.show($mdToast.simple().textContent('Successfully deleted assignment "' + assignment.name + '" (ID: ' + assignment.assignmentId + ')').position('top right').theme('success-toast'));
						}, function() {
							$mdToast.show($mdToast.simple().textContent('Failed to delete assignment "' + assignment.name + '" (ID: ' + assignment.assignmentId + ')').position('top right').theme('error-toast'));
						});
					});

				},
				icon: 'delete',
				description: 'Delete assignment'
			}, {
				action: function(assignment) {
					$state.go('base.app.courseOwner.courses.details.assignment.details.edit');
				},
				icon: 'edit',
				description: 'Edit Assignment'
			}
		];
	}];
});