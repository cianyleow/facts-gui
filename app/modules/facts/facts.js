define(['angular',
	'modules/facts/services/services',
	'modules/facts/directives/directives',
	'modules/facts/student/studentModule',
	'modules/facts/courseOwner/courseOwnerModule',
	'modules/facts/marker/markerModule'],
	function(angular, services, directives) {
		'use strict';
		var configFn = ['facts.student', 'facts.courseOwner', 'facts.marker'];
		var facts = angular.module('facts', configFn);	
		services.init(facts);
		directives.init(facts);
		return facts;
	}
);