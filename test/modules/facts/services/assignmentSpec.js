define(['baseTestSetup', 'fixtures'], function(baseTestSetup, fixtures) {
    'use strict';
    describe('facts.services.assignment', function() {
        var AssignmentService, _assignment;
        baseTestSetup();
        
        beforeEach(inject(function($injector) {
            AssignmentService = $injector.get('facts.services.assignment');
            _assignment = fixtures['api/assignments'][0];
        }));

        describe('External assignment retrieval methods', function() {
            it('Load assignment calls out to server and updates internal object', inject(function($httpBackend) {
                AssignmentService.loadAssignment(1);
                $httpBackend.expectGET(/^api\/assignments\/\d+/);
                $httpBackend.flush();
                expect(AssignmentService.currentAssignment.loaded).toBe(true);
                expect(AssignmentService.currentAssignment.assignmentId).toBe(1);
            }));

            it('Get of same assignment after load completes results in cached result', inject(function($httpBackend) {
                AssignmentService.loadAssignment(1);
                $httpBackend.expectGET(/^api\/assignments\/\d+/);
                $httpBackend.flush();
                AssignmentService.getAssignment(1);

            }));

            it('Get of uncached assignment will hit server and not use cache', inject(function($httpBackend) {
                AssignmentService.getAssignment(1);
                $httpBackend.expectGET(/^api\/assignments\/\d+/);
                $httpBackend.flush();
            }));

            it('Get of uncached assignment will not affect cache', inject(function($httpBackend) {
                AssignmentService.getAssignment(1);
                $httpBackend.expectGET(/^api\/assignments\/\d+/);
                $httpBackend.flush();
                expect(AssignmentService.currentAssignment.assignmentId).toBe(-1);
                expect(AssignmentService.currentAssignment.loaded).toBe(false);
            }));

            it('Get of different assignment will hit server and not use cache', inject(function($httpBackend) {
                AssignmentService.loadAssignment(1);
                $httpBackend.expectGET(/^api\/assignments\/1/);
                $httpBackend.flush();
                AssignmentService.getAssignment(2);
                $httpBackend.expectGET(/^api\/assignments\/2/);
                $httpBackend.flush();
            }));
        });

        describe('Review assignment methods', function() {
            it('Get assignment returns base assignment for uninitialized state', function() {
                var assignment = AssignmentService.getAssignmentForReview();
                expect(assignment.name).toBeUndefined();
                expect(assignment.description).toBeUndefined();
                expect(assignment.creationTime).toBeUndefined();
                expect(assignment.openTime).toBeUndefined();
                expect(assignment.requiredFiles).toEqual([]);
                expect(assignment.suppliedFiles).toEqual([]);
                expect(assignment.markComponents).toEqual([]);
            });

            it('Has assignment returns false for initialization state', function() {
                expect(AssignmentService.hasAssignmentForReview()).toEqual(false);
            });

            it('Expect same object to be returned after put', function() {
                AssignmentService.putAssignmentForReview(_assignment);
                expect(AssignmentService.getAssignmentForReview()).toEqual(_assignment);
            });

            it('Expect putAssignmentForReview to overwrite values', function() {
                AssignmentService.putAssignmentForReview(_assignment);
                var assignment = {};
                AssignmentService.putAssignmentForReview(assignment);
                expect(AssignmentService.getAssignmentForReview()).toEqual(assignment);
            });

            it('Expect has assignment to be true when an assignment has been put', function() {
                AssignmentService.putAssignmentForReview(_assignment);
                expect(AssignmentService.hasAssignmentForReview()).toEqual(true);
            });
        });
    });
});