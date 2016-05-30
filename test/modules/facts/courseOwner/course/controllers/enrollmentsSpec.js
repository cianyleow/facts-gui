define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.controllers.enrollments', function() {
        var EnrollmentsController, scope, DialogService, $mdDialog, deferred;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
            DialogService = $injector.get('base.services.dialog');
            $mdDialog = $injector.get('$mdDialog');
            deferred = $q.defer();
            spyOn($mdDialog, 'show').andReturn(deferred.promise);
            EnrollmentsController = $controller('facts.courseOwner.course.controllers.enrollments', {
                $scope: scope,
                $stateParams: {courseId: 1}
            });
        }));

        it('Should initialize environment with table variables and get enrollments from server.', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/courses\/1\/enrollments/);
            $httpBackend.flush();
            expect(scope.enrollments).toBeDefined();
            expect(scope.selected).toBeDefined();
            expect(scope.query).toBeDefined();
            expect(scope.enrollmentLevels).toBeDefined();
        }));

        it('Expect bulk delete action to remove the selected enrollments from the enrollments array', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.selected = [scope.enrollments[0]];
            var preDeletionLength = scope.enrollments.length;
            scope.deleteEnrollments(scope.selected);
            $httpBackend.expectDELETE(/^api\/enrollments\/1/);
            $httpBackend.flush();
            expect(scope.enrollments.length).toEqual(preDeletionLength - 1);
            expect(scope.selected).toEqual([]);
        }));

        it('Expect delete action to remove the individual enrollment from the enrollments array', inject(function($httpBackend) {
            $httpBackend.flush();
            var enrollment = scope.enrollments[0];
            var preDeletionLength = scope.enrollments.length;
            scope.deleteEnrollment(enrollment);
            $httpBackend.expectDELETE(/^api\/enrollments\/1/);
            $httpBackend.flush();
            expect(scope.enrollments.length).toEqual(preDeletionLength - 1);
        }));

        it('Expect change enrollments to open dialog', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(DialogService, 'showCustomDialog').andCallFake(function() { return {};});
            scope.changeEnrollments();
            expect(DialogService.showCustomDialog).toHaveBeenCalled();
        }));

        it('Successful bulk change enrollment dialog response should call to server and update enrollments', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(DialogService, 'showCustomDialog').andCallFake(function(ctrl, src, bdy, evt, success) { success('EXAM_CREDIT')});
            scope.selected = [scope.enrollments[0], scope.enrollments[1]];

            scope.changeEnrollments(scope.selected);

            $httpBackend.expectPUT(/^api\/enrollments\/1/);
            $httpBackend.expectPUT(/^api\/enrollments\/2/);
            $httpBackend.flush();

            expect(scope.selected).toEqual([]);
            expect(scope.enrollments[0].enrollmentLevel).toEqual('EXAM_CREDIT');
        }));

        it('Expect save enrollment level to call to server on success', inject(function($httpBackend) {
            $httpBackend.flush();
            var enrollment = scope.enrollments[0];
            enrollment._enrollmentLevel = 'EXAM_CREDIT';
            scope.saveEnrollment(enrollment);
            expect($mdDialog.show).toHaveBeenCalled();
            deferred.resolve('EXAM_CREDIT');
            $httpBackend.expectPUT(/^api\/enrollments\/1/);
            $httpBackend.flush();
            expect(enrollment.enrollmentLevel).toEqual('EXAM_CREDIT');
        }));
    });
});