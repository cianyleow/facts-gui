define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$mdDialog', '$mdToast', '$state', function($scope, $stateParams, Restangular, $mdDialog, $mdToast, $state) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		$scope.submissions = assignment.getList('submissions').$object;

		$scope.query = {
			order: 'submitter.username',
			limit: 30,
			page: 1
		};
		
		$scope.assignMarkers = function(event) {
			assignment.all('feedback').post().then(function(_submissions) {
				$scope.submissions = _submissions;
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

		$scope.delete = function(_assignment) {
			assignment.remove().then(function() {
				$state.go('base.app.courseOwner.courses.details');
				$mdToast.show($mdToast.simple().textContent('Successfully deleted assignment "' + _assignment.name + '" (ID: ' + _assignment.assignmentId + ')').position('top right').theme('success-toast'));
			}, function() {
				$mdToast.show($mdToast.simple().textContent('Failed to delete assignment "' + _assignment.name + '" (ID: ' + _assignment.assignmentId + ')').position('top right').theme('error-toast'));
			});
		};
	}];
});