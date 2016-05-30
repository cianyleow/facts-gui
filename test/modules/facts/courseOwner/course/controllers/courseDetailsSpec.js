define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.controllers.details', function() {
        var CourseDetailsController, scope, DialogService, $mdDialog, deferred;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
            DialogService = $injector.get('base.services.dialog');
            CourseDetailsController = $controller('facts.courseOwner.course.controllers.details', {
                $scope: scope,
                $stateParams: {courseId: 1}
            });
        }));

        it('Should initialize environment with admin course object', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/courses\/1\/admin/);
            $httpBackend.flush();
            expect(scope.course).toBeDefined();
            expect(scope.course.announcements).toBeDefined();
        }));

        it('Editing a course should create a copy of the course to be edited and start edit mode', inject(function($httpBackend) {
            $httpBackend.flush();
            var course = scope.course;
            scope.edit(course);
            expect(scope._course).toEqual(course);
            expect(scope.editCourse).toEqual(true);
        }));

        it('Canceling a course edit should remove the copy and set the edit mode false', inject(function($httpBackend) {
            $httpBackend.flush();
            var course = scope.course;
            scope.edit(course);
            scope.cancelEdit();
            expect(scope._course).toBeUndefined();
            expect(scope.course).toEqual(course);
            expect(scope.editCourse).toEqual(false);
        }));

        it('Saving a course should inititate an API call and then update variables', inject(function($httpBackend) {
            $httpBackend.flush();
            var course = angular.copy(scope.course);
            course.description = 'Changed';
            scope.save(course);
            $httpBackend.expectPUT(/^api\/courses\/1\/admin/);
            $httpBackend.flush();
            expect(scope.editCourse).toEqual(false);
            expect(scope._course).toBeUndefined();
            expect(scope.course.description).toEqual(course.description);
        }));
    });
});