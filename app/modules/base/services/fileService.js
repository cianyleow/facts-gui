define([], function() {	'use strict';	return ['Upload', function(Upload) {		var service = this;		service.uploadFile = function(address, data, successCallback, errorCallback, progressCallback) {			return Upload.upload({				url: 'http://localhost:8080/'+address,				data: data			}).then(function(resp) {				successCallback(resp);			}, function(resp) {				errorCallback(resp);			}, function(evt) {				progressCallback(evt);			});		};				service.uploadFile = function(address, data) {			return Upload.upload({				url: 'http://localhost:8080/'+address,				data: data			});		};		return service;	}];});