define(['baseTestSetup'],
    function(baseTestSetup) {
        'use strict';
        describe('base.services.authentication', function() {
            var AuthenticationService, TokenService, user;

            baseTestSetup();

            beforeEach(inject(function($injector) {
                TokenService = $injector.get('base.services.token');
                spyOn(TokenService, 'clear').andCallThrough();
                spyOn(TokenService, 'store').andCallThrough();
                AuthenticationService = $injector.get('base.services.authentication');

                user = {
                    username: 'test',
                    password: 'test'
                };
            }));

            it('Logout must clear token service', function() {
                AuthenticationService.logout();
                expect(TokenService.clear).toHaveBeenCalled();
            });

            it('Login calls to server', inject(function($httpBackend) {
                AuthenticationService.login(user, function() {});
                $httpBackend.expectPOST(/^api\/login/);
                $httpBackend.flush();
            }));

            it('Login stores token in tokenService', inject(function($httpBackend) {
                AuthenticationService.login(user, function() {});
                $httpBackend.flush();
                expect(TokenService.store).toHaveBeenCalled();
                expect(TokenService.retrieve()).toBeDefined();
            }));
        });
    }
);