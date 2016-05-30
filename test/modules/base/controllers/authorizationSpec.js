define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.authorization', function() {
        var AuthorizationController, scope, AuthenticationService;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            AuthenticationService = $injector.get('base.services.authentication');
            AuthorizationController = $controller('base.controllers.authorization', {
                $scope: scope
            });
        }));

        it('Should define a user, error, attempts and states.', function() {
            expect(scope.user).toBeDefined();
            expect(scope.timeout).toEqual(false);
            expect(scope.error).toEqual(false);
            expect(scope.attempts).toEqual(0);
            expect(scope.states).toBeDefined();
        });

        it('Authentication request should use AuthenticationService', function() {
            spyOn(AuthenticationService, 'login').andCallFake(function() {});
            var user = {};
            scope.authenticate(user);
            expect(AuthenticationService.login).toHaveBeenCalled();
        });

        it('Failed authentication should invoke only error mode and increase attempts', function() {
            spyOn(AuthenticationService, 'login').andCallFake(function(user, redirect, callback) { callback({ status: 404});});
            var user = {};
            scope.authenticate(user);
            scope.$digest();
            expect(scope.error).toEqual(true);
            expect(scope.timeout).toEqual(false);
            expect(scope.attempts).toEqual(1);
        });

        it('Timed out authentication should invoke only timeout mode and increase attempts', function() {
            spyOn(AuthenticationService, 'login').andCallFake(function(user, redirect, callback) { callback({ status: -1});});
            var user = {};
            scope.authenticate(user);
            scope.$digest();
            expect(scope.error).toEqual(false);
            expect(scope.timeout).toEqual(true);
            expect(scope.attempts).toEqual(1);
        });
    });
});