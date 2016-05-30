define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.controllers.details', function() {
        var CourseDetailsController, scope, DialogService, $mdDialog, deferred;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector, $q) {
            scope = $rootScope.$new();
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

        it('Saving a course which then fails should reset the description and editing.', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.course.description = 'Initial';
            var course = angular.copy(scope.course);
            course.description = 'Changed';
            expect(scope.course.description).toEqual('Initial');
            scope.save(course);
            $httpBackend.expectPUT(/^api\/courses\/1\/admin/).respond(500);
            $httpBackend.flush();
            expect(scope.editCourse).toEqual(false);
            expect(scope._course).toBeUndefined();
            expect(scope.course.description).toEqual('Initial');
        }));

        describe('facts.courseOwner.course.controllers.details.announcements', function() {

            beforeEach(inject(function($httpBackend, $injector) {
                $httpBackend.flush(); // Clear out any pending requests.
                DialogService = $injector.get('base.services.dialog');
                spyOn(DialogService, 'showCustomDialog').andCallFake(function(ctrl, src, bdy, evt, success) {
                   success({
                       title: 'Title',
                       content: 'Content'
                   })
                });
            }));

            it('New announcement creates dialog and does server request on success', inject(function($httpBackend) {
                scope.newAnnouncement();
                var numAnnouncements = scope.course.announcements.length;
                expect(DialogService.showCustomDialog).toHaveBeenCalled();
                $httpBackend.expectPOST(/^api\/courses\/1\/announcements/);
                $httpBackend.flush();
                expect(scope.course.announcements).toBeDefined();
                expect(scope.course.announcements.length).toEqual(numAnnouncements + 1); // Should add one more to list
            }));

            it('Delete announcement results in the removal of the announcement from the list', inject(function($httpBackend) {
                var announcement = scope.course.announcements[0];
                var numAnnouncements = scope.course.announcements.length;
                scope.deleteAnnouncement(announcement);
                expect(announcement.deleting).toEqual(true);
                expect(announcement.failed).toEqual(false);
                $httpBackend.expectDELETE(/^api\/announcements\/1/).respond(200);
                $httpBackend.flush();
                expect(scope.course.announcements.length).toEqual(numAnnouncements - 1);
            }));

            it('Failed announcement deletion results in a failed state', inject(function($httpBackend) {
                var announcement = scope.course.announcements[0];
                var numAnnouncements = scope.course.announcements.length;
                scope.deleteAnnouncement(announcement);
                expect(announcement.deleting).toEqual(true);
                expect(announcement.failed).toEqual(false);
                $httpBackend.expectDELETE(/^api\/announcements\/1/).respond(500);
                $httpBackend.flush();
                expect(announcement.deleting).toEqual(false);
                expect(announcement.failed).toEqual(true);
            }));
        });
    });
});