define([], function() {	'use strict';	return ['Restangular', function(Restangular) {		var service = this;				service.currentAssignment = {			assignmentId: -1,			assignment: {},			loaded: false		};		service.reviewAssignment = {			assignment: {},			loaded: false		};				service.getAssignment = function(assignmentId) {			if(!service.currentAssignment.loaded || service.currentAssignment.assignmentId !== assignmentId) {				// Return the restangularized version				return Restangular.one('assignments', assignmentId).get().$object;			} // Return the cached page version.			return service.currentAssignment.assignment;		};				service.loadAssignment = function(assignmentId) {			return Restangular.one('assignments', assignmentId).get().then(function(_assignment) {				service.currentAssignment.assignmentId = assignmentId;				service.currentAssignment.assignment = _assignment;				service.currentAssignment.loaded = true;				return service.currentAssignment.assignment;			});		};				service.putAssignmentForReview = function(assignment) {			service.reviewAssignment.assignment = assignment;			service.reviewAssignment.loaded = true;		};				service.getAssignmentForReview = function() {			if(service.reviewAssignment.loaded) {				return service.reviewAssignment.assignment;			} else {				return {					groupBased: false,					requiredFiles: [],					suppliedFiles: []				};			}		};				service.hasAssignmentForReview = function() {			return service.reviewAssignment.loaded;		};				return service;	}];});