define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.controllers.courses', function() {
        var CoursesController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
            CoursesController = $controller('facts.courseOwner.course.controllers.courses', {
                $scope: scope
            });
        }));

        it('Should initialize with request to list of owned courses from self', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/self\/ownedCourses/);
            $httpBackend.flush();
        }));
    });
});