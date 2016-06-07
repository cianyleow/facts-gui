require.config({
	baseUrl: 'src',
	paths: {
		'angular': 'bower_components/angular/angular.min',
		'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
		'restangular': 'bower_components/restangular/dist/restangular.min',
		'lodash': 'bower_components/lodash/lodash',
		'angular-file-upload': 'bower_components/angular-file-upload/dist/angular-file-upload.min',
		'angular-material': 'bower_components/angular-material/angular-material.min',
		'angular-animate': 'bower_components/angular-animate/angular-animate.min',
		'angular-aria': 'bower_components/angular-aria/angular-aria.min',
		'angular-ui-breadcrumbs': 'bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs',
		'angular-ui-title': 'bower_components/angular-ui-router-title/angular-ui-router-title',
		'ng-file-upload': 'bower_components/ng-file-upload/ng-file-upload.min',
		'angular-material-data-table': 'bower_components/angular-material-data-table/dist/md-data-table.min',
		'ng-messages': 'bower_components/angular-messages/angular-messages.min'
	},
	shim: {
		'angular': { exports: 'angular'},
		'angular-ui-router': { deps: ['angular']},
		'restangular': { deps: ['angular', 'lodash']},
		'lodash': { exports: '_'},
		'angular-animate': { deps: ['angular']},
		'angular-aria': {deps: ['angular']},
		'angular-material': {
			deps: ['angular-animate', 'angular-aria']
		},
		'angular-ui-breadcrumbs': {deps: ['angular']},
		'angular-ui-title': {deps: ['angular']},
		'ng-file-upload': {deps: ['angular']},
		'angular-material-data-table': {deps: ['angular']},
		'ng-messages': {deps: ['angular']}
	}
});

var dependencies = ['angular', 'app'];
require(dependencies, function(angular) {
	'use strict';
	angular.bootstrap(document, ['app']);
})