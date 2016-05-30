define(['baseTestSetup', 'fixtures'], function(baseTestSetup, fixtures) {
    'use strict';
    describe('facts.courseOwner.course.assignment.controllers.new', function() {
        var NewAssignmentController, scope, AssignmentService, assignment, DialogService, $state;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            assignment = fixtures['api/assignments'][0];
            DialogService = $injector.get('base.services.dialog');
            AssignmentService = $injector.get('facts.services.assignment');
            $state = $injector.get('$state');
            spyOn($state, 'go').andCallFake(function() { return {}; });
            spyOn(AssignmentService, 'getAssignmentForReview').andCallThrough();
            spyOn(AssignmentService, 'putAssignmentForReview').andCallThrough();
            spyOn(DialogService, 'showCustomDialog').andCallFake(function() {return {};});
            NewAssignmentController = $controller('facts.courseOwner.course.assignment.controllers.new', {
                $scope: scope
            });
        }));

        it('Should open new dialog for new supplied file', function() {
            scope.suppliedFileDialog();
            expect(DialogService.showCustomDialog).toHaveBeenCalled();
        });

        it('Should open new dialog for new required file', function() {
            scope.requiredFileDialog();
            expect(DialogService.showCustomDialog).toHaveBeenCalled();
        });

        it('Expect assignment service to return empty assignment on bare initialization', function() {
            expect(AssignmentService.getAssignmentForReview).toHaveBeenCalled();
            expect(scope.assignment.name).toBeUndefined();
        });

        it('Review action should put the assignment', function() {
            scope.review(assignment);
            expect(AssignmentService.putAssignmentForReview).toHaveBeenCalledWith(assignment);
        });

        it('Review should trigger state change to review', function() {
            scope.review(assignment);
            expect($state.go).toHaveBeenCalledWith('base.app.courseOwner.courses.details.assignments.new.review');
        });

        it('Remove line function should eliminate the correct line', function() {
            var array = ['a', 'b', 'c'];
            scope.removeLine(array, 1);
            var result = ['a', 'c'];
            expect(array).toEqual(result);
        });

        it('Removing line from bare array does nothing', function() {
            var array = [];
            scope.removeLine(array, 1);
            expect(array).toBe(array);
        });

        it('Removing incorrect index does nothing', function() {
            var array = ['a', 'b', 'c'];
            scope.removeLine(array, 100);
            expect(array).toBe(array);
        });

        it('Watched assignment openTime should change dueTime to itself if greater than current dueTime', function() {
            var now = new Date().getTime();
            var ahead = now + 3600 * 1000; // Add one day
            scope.assignment.dueTime = now;
            scope.$digest();
            scope.assignment.openTime = ahead;
            scope.$digest();
            expect(scope.assignment.dueTime).toEqual(ahead);
        });
    });
});