define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.sidenav.student.controller', function() {
        var SideNavController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            SideNavController = $controller('base.controllers.sidenav.student.controller', {
                $scope: scope
            });
        }));

        it('Should use marker menu resources', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.baselink).toEqual('base.app.courses.details');
            expect(scope.currentPeriod).toBeDefined();
        }));

        it('Should make request to get enrolled courses', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/self\/enrolledCourses/);
            $httpBackend.flush();
            expect(scope.courses).toBeDefined();
        }));
    });
});