define(['backendMock', 'angular-mocks', 'app'], function(backendMock) {
    'use strict';
    return function() {
        beforeEach(module('app'));
        beforeEach(module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        }));

        beforeEach(inject(function($httpBackend, $injector) {
            backendMock($httpBackend);
        }));
        
        afterEach(inject(function($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));
    };
});