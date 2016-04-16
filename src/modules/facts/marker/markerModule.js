define(['angular', './controllers/controllers', './marking/markingModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.marker.marking'];
	var marker = angular.module('facts.marker', configFn);
	
	marker.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.marker.dashboard', {
				url: '/dashboard',
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/marker/partials/dashboard.tpl.html',
						controller: 'facts.marker.controllers.dashboard'
					}
				},
				data: {
					displayName: 'Dashboard'
				},
				resolve: {
					$title: function() { return 'Marker | Dashboard'; }
				}
			});
	}]);
	
	controllers.init(marker);
	return marker;
});