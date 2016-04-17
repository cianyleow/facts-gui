define(['backendMock',
    'angular-mocks',
    'app'],
    function(backendMock) {
        'use strict';
        return function() {
            beforeEach(module('app'));
            beforeEach(module(function($urlRouterProvider) {
                $urlRouterProvider.deferIntercept();
            }));

            beforeEach(function() {
                localStorage.clear();
            });
            
            beforeEach(inject(function($injector) {
                var PieChartService = $injector.get('base.services.piechart');
                spyOn(PieChartService, 'getPieChartLines').andCallFake(function() {return [];});
            }));

            beforeEach(inject(function($httpBackend) {
                backendMock($httpBackend);
            }));

            afterEach(inject(function($httpBackend) {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }));
        };
    }
);