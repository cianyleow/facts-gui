define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.sidenav.courseOwner.controller', function() {
        var SideNavController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            SideNavController = $controller('base.controllers.sidenav.courseOwner.controller', {
                $scope: scope
            });
        }));

        it('Should use course owner menu resources', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.baselink).toEqual('base.app.courseOwner.courses.details');
            expect(scope.currentPeriod).toBeDefined();
        }));

        it('Should make request to get owned courses', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/self\/ownedCourses/);
            $httpBackend.flush();
            expect(scope.courses).toBeDefined();
        }));
    });
});