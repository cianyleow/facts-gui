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
		
		$scope.actions = [
			{
				action: function(assignment) {
					console.log('Assign markers!' + assignment);
				},
				icon: 'link',
				description: 'Assign Markers'
				
			}
		];

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