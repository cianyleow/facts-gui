define(['baseTestSetup'],
    function(baseTestSetup) {
        'use strict';
        describe('base.services.authentication', function() {
            var AuthenticationService, TokenService;

            baseTestSetup();

            beforeEach(inject(function($injector) {
                TokenService = $injector.get('base.services.token');
                spyOn(TokenService, 'clear').andCallThrough();
                AuthenticationService = $injector.get('base.services.authentication');
            }));

            it('Logout must clear token service', function() {
                AuthenticationService.logout();
                expect(TokenService.clear).toHaveBeenCalled();
            });
        });
    }
);