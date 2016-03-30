define(['angular', './controllers/controllers'], function(angular, controllers) {
	'use strict';
	var configFn = [];
	var marking = angular.module('facts.marker.marking', configFn);
	marking.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.marker.marking', {
				url: '/marking',
				views: {
					'mainContent@app': {
							templateUrl: 'modules/facts/marker/marking/partials/markings.tpl.html',
							controller: 'facts.marker.marking.controllers.markings'
						}
				},
				data: {
					displayName: 'Marking'
				},
				resolve: {
					$title: function() { return 'Marking'; }
				}
			});
	}]);
	
	controllers.init(marking);
	return marking;
});