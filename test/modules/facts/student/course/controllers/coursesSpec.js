define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.student.course.controllers.courses', function() {
        var EnrollmentsController, scope, $mdDialog, deferred;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
            $mdDialog = $injector.get('$mdDialog');
            deferred = $q.defer();
            spyOn($mdDialog, 'show').andReturn(deferred.promise);
            EnrollmentsController = $controller('facts.student.course.controllers.courses', {
                $scope: scope,
                $stateParams: {courseId: 1}
            });
        }));

        it('Should initialize environment with course and enrollments', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/self\/enrollments/);
            $httpBackend.expectGET(/^api\/courses/);
            $httpBackend.flush();
            expect(scope.enrollments).toBeDefined();
            expect(scope.allCourses.length).toEqual(1);
        }));

        it('Enroll calls to server and removes enrolled course from allCourses and places in enrollments', inject(function($httpBackend) {
            $httpBackend.flush();
            var enrollmentLength = scope.enrollments.length;
            var course = scope.allCourses[0];
            scope.enroll(course);
            expect($mdDialog.show).toHaveBeenCalled();
            deferred.resolve();
            $httpBackend.expectPOST(/^api\/courses\/[\d]+\/enrollments/).respond({
                enrollmentId: 2,
                enrollmentLevel: 'NO_CREDIT'
            });
            $httpBackend.flush();
            expect(scope.enrollments.length).toEqual(enrollmentLength + 1);
            expect(scope.allCourses.indexOf(course)).toEqual(-1);
        }));

        it('Unenroll calls to server and removes enrolled course from enrollments and places in allCourses', inject(function($httpBackend) {
            $httpBackend.flush();
            var allCoursesLength = scope.allCourses.length;
            var enrollment = scope.enrollments[0];
            scope.unenroll(enrollment);
            expect($mdDialog.show).toHaveBeenCalled();
            deferred.resolve();
            $httpBackend.expectDELETE(/^api\/enrollments\/[\d]+/).respond(200);
            $httpBackend.flush();
            expect(scope.allCourses.length).toEqual(allCoursesLength + 1);
            expect(scope.enrollments.indexOf(enrollment)).toEqual(-1);
        }));
    });
});