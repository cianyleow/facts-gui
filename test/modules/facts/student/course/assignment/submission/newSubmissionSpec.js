define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.student.course.assignment.submission.controllers.new', function() {
        var NewSubmissionController, scope, AssignmentService, $mdDialog, deferred, DialogService;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
            DialogService = $injector.get('base.services.dialog');
            spyOn(DialogService, 'showProgressDialog').andCallFake(function() {});
            spyOn(DialogService, 'cancelActiveDialog').andCallFake(function() {});
            spyOn(DialogService, 'showCustomDialog').andCallFake(function(ctrl, src, bdy, evt, success) { success({});});
            AssignmentService = $injector.get('facts.services.assignment');
            spyOn(AssignmentService, 'getAssignment').andCallFake(function() {
                return {
                    requiredFiles: [
                        {
                            fileRequirementId: 1
                        },
                        {
                            fileRequirementId: 2
                        }
                    ]
                };
            });
            $mdDialog = $injector.get('$mdDialog');
            deferred = $q.defer();
            spyOn($mdDialog, 'show').andReturn(deferred.promise);
            NewSubmissionController = $controller('facts.student.course.assignment.submission.controllers.new', {
                $scope: scope,
                $stateParams: {assignmentId: 1}
            });
        }));

        it('Should get assignment from assignment service and variables are initialized', function($httpBackend) {
            expect(AssignmentService.getAssignment).toHaveBeenCalledWith(1);
            expect(scope.assignment).toBeDefined();
            expect(scope.submission).toBeDefined();
        });

        it('Expect remove submission file to move submission file to requiredFiles', function() {
            var submissionFileMock = {
                file: {}
            };
            scope.submission.submissionFiles.push(submissionFileMock);
            var numSubmissionFiles = scope.submission.submissionFiles.length;
            var numRequiredFiles = scope.assignment.requiredFiles.length;

            scope.removeSubmissionFile(undefined, submissionFileMock, 0);
            expect($mdDialog.show).toHaveBeenCalled();
            deferred.resolve();
            expect(scope.submission.submissionFiles.length).toEqual(numSubmissionFiles - 1);
            expect(scope.assignment.requiredFiles.length).toEqual(numRequiredFiles + 1);
        });

        it('Expect add submission file to move required file to submissionFiles', function() {
            var numSubmissionFiles = scope.submission.submissionFiles.length;
            var numRequiredFiles = scope.assignment.requiredFiles.length;

            var requiredFile = scope.assignment.requiredFiles[0];

            scope.addSubmissionFile(undefined, requiredFile, 0);
            expect(DialogService.showCustomDialog).toHaveBeenCalled();
            expect(scope.assignment.requiredFiles.length).toEqual(numRequiredFiles - 1);
            expect(scope.submission.submissionFiles.length).toEqual(numSubmissionFiles + 1);
        });

        it('Submission should call to server and show progress dialog', inject(function($httpBackend) {
            var submission = { submissionId: 1};
            scope.submit(submission);
            expect(DialogService.showProgressDialog).toHaveBeenCalled();
            $httpBackend.expectPOST(/^api\/assignments\/[\d]+\/submissions/).respond([201, submission]);
            $httpBackend.flush();
            expect(scope._submission).toBeDefined();
            expect(DialogService.cancelActiveDialog).toHaveBeenCalled();
        }));

        it('Failed submission request closes dialog and shows errors', inject(function($httpBackend) {
            var submission = { submissionId: 1};
            scope.submit(submission);
            expect(DialogService.showProgressDialog).toHaveBeenCalled();
            $httpBackend.expectPOST(/^api\/assignments\/[\d]+\/submissions/).respond(500);
            $httpBackend.flush();
            expect(scope._submission).not.toBeDefined();
            expect(DialogService.cancelActiveDialog).toHaveBeenCalled();
            expect(scope.error).toBeDefined();
        }));
    });
});