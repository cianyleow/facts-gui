define(['baseTestSetup', 'fixtures'], function(baseTestSetup, fixtures) {
    'use strict';
    describe('facts.courseOwner.course.assignment.controllers.review', function() {
        var ReviewAssignmentController, scope, AssignmentService, assignment, $state;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            assignment = fixtures['api/assignments'][0];
            $state = $injector.get('$state');
            AssignmentService = $injector.get('facts.services.assignment');
            spyOn(AssignmentService, 'hasAssignmentForReview').andCallFake(function() {return false;});
            spyOn($state, 'go').andCallFake(function() {return {};});
            ReviewAssignmentController = $controller('facts.courseOwner.course.assignment.controllers.review', {
                $scope: scope,
                $stateParams: {courseId: 1},
                $state: $state
            });
        }));

        it('Should revert to new state if no review assignment exists', function() {
            expect(AssignmentService.hasAssignmentForReview).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalled();
        });

        it('Should make call to server to post new assignment', inject(function($httpBackend) {
            scope.create(assignment);
            $httpBackend.expectPOST(/^api\/courses\/1\/assignments/);
            $httpBackend.flush();
        }));
    });
});