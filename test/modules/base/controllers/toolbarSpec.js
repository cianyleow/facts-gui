define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.authorization', function() {
        var ToolbarController, scope, AuthenticationService, TokenService, state;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            AuthenticationService = $injector.get('base.services.authentication');
            TokenService = $injector.get('base.services.token');
            state = $injector.get('$state');
            spyOn(AuthenticationService, 'logout').andCallFake(function() {});
            spyOn(TokenService, 'userInfo').andCallFake(function() {
                return {
                    userDetails: {
                        firstName: 'First',
                        lastName: 'Last',
                        userName: 'user'
                    }
                };
            });
            spyOn(state, 'go').andCallFake(function() {});
            ToolbarController = $controller('base.controllers.toolbar', {
                $scope: scope,
                $state: state
            });
        }));

        it('Expect TokenService to have been called and user details created', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(TokenService.userInfo).toHaveBeenCalled();
            expect(scope.userDetails).toBeDefined();
        }));

        it('Expect notifications to have been received from server', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/self\/notifications/);
            $httpBackend.flush();
            expect(scope.notifications).toBeDefined();
        }));

        it('Calling logout action should go to authentication service', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.logout();
            expect(AuthenticationService.logout).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalled();
        }));
    });
});