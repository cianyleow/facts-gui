define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.sidenav.marker.controller', function() {
        var SideNavController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            SideNavController = $controller('base.controllers.sidenav.marker.controller', {
                $scope: scope
            });
        }));

        it('Should use marker menu resources', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.baselink).toEqual('base.app.marker.courses.details');
            expect(scope.currentPeriod).toBeDefined();
        }));

        it('Should make request to get marked courses', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/self\/markedCourses/);
            $httpBackend.flush();
            expect(scope.courses).toBeDefined();
        }));
    });
});