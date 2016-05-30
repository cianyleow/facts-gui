define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.student.course.assignment.submission.controllers.details', function() {
        var SubmissionDetailsController, scope, AssignmentService;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            AssignmentService = $injector.get('facts.services.assignment');
            spyOn(AssignmentService, 'getAssignment').andCallFake(function() {
                return {};
            });
            SubmissionDetailsController = $controller('facts.student.course.assignment.submission.controllers.details', {
                $scope: scope,
                $stateParams: {assignmentId: 1, submissionId: 1}
            });
        }));

        it('Should initialize environment with assignment and submission', inject(function($httpBackend) {
            expect(AssignmentService.getAssignment).toHaveBeenCalledWith(1);
            $httpBackend.expectGET(/^api\/submissions\/1/);
            $httpBackend.flush();
            expect(scope.assignment).toBeDefined();
            expect(scope.submission).toBeDefined();
        }));
    });
});