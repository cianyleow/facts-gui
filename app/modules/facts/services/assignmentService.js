define([], function() {	'use strict';	return ['Restangular', function(Restangular) {		return {			getAssignment: function(assignmentId) {				return getAssignmentPromise(assignmentId).$object;			},			getAssignmentPromise: function(assignmentId) {				return Restangular.one('assignments', assignmentId).get();			}		};	}];});