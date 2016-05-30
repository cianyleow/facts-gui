define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.student.course.controllers.details', function() {
        var EnrollmentsController, scope, CourseService, $mdDialog, deferred;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
            CourseService = $injector.get('facts.services.course');
            spyOn(CourseService, 'getCourse').andCallFake(function() {
                return {};
            });
            $mdDialog = $injector.get('$mdDialog');
            deferred = $q.defer();
            spyOn($mdDialog, 'show').andReturn(deferred.promise);
            EnrollmentsController = $controller('facts.student.course.controllers.details', {
                $scope: scope,
                $stateParams: {courseId: 1}
            });
        }));

        it('Should initialize environment with course and enrollments', inject(function($httpBackend) {
            expect(CourseService.getCourse).toHaveBeenCalledWith(1);
            $httpBackend.expectGET(/^api\/courses\/1\/enrollment/);
            $httpBackend.flush();
            expect(scope.enrollment).toBeDefined();
            expect(scope.course).toBeDefined();
            expect(scope.enrollment.enrollmentLevel).toEqual(scope.enrollment._enrollmentLevel);
        }));

        it('Expect cancel enrollment edit to reset enrollmentLevel variable and exit edit mode', inject(function($httpBackend) {
            $httpBackend.flush();
            var enrollment = {
                enrollmentLevel: 'NO_CREDIT',
                _enrollmentLevel: 'SUBMISSION_CREDIT'
            };
            scope.cancelEnrollmentEdit(enrollment);
            expect(enrollment.enrollmentLevel).toEqual('NO_CREDIT');
            expect(enrollment._enrollmentLevel).toEqual('NO_CREDIT');
        }));

        it('Expect save enrollment to just close when enrollment level has not changed.', inject(function($httpBackend) {
            $httpBackend.flush();
            var enrollment = {
                enrollmentLevel: 'NO_CREDIT',
                _enrollmentLevel: 'NO_CREDIT',
                enrollmentId:'1'
            };
            scope.saveEnrollment(enrollment);
            expect($mdDialog.show).not.toHaveBeenCalled();
        }));

        it('Expect save enrollment to update through server on different values and confirm', inject(function($httpBackend) {
            $httpBackend.flush();
            var enrollment = {
                enrollmentLevel: 'NO_CREDIT',
                _enrollmentLevel: 'SUBMISSION_CREDIT',
                enrollmentId:'1'
            };
            scope.saveEnrollment(enrollment);
            expect($mdDialog.show).toHaveBeenCalled();
            deferred.resolve();
            $httpBackend.expectPUT(/^api\/enrollments\/1/);
            $httpBackend.flush();
            expect(scope.enrollment.enrollmentLevel).toEqual('SUBMISSION_CREDIT');
        }));
    });
});