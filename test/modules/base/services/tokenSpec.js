define(['baseTestSetup'],
    function(baseTestSetup) {
        'use strict';
        describe('base.services.token', function() {
            var TokenService;

            baseTestSetup();

            beforeEach(inject(function($injector) {
                TokenService = $injector.get('base.services.token');
            }));

            it('No value is returned before initialization', function() {
                expect(TokenService.retrieve()).toBeNull();
            });

            it('Value is stored as what it should be', function() {
                var token = 'TOKEN';
                TokenService.store(token);
                expect(TokenService.retrieve()).toBe(token);
            });

            it('Value is cleared correctly after clear function is called', function() {
                var token = 'TOKEN';
                TokenService.store(token);
                TokenService.clear();
                expect(TokenService.retrieve()).toBeNull();
            });
        });
    }
);