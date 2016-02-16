require.config({
	paths: {
		'app': 'app',
		'angular': 'bower_components/angular/angular',
		'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
		'restangular': 'bower_components/restangular/dist/restangular.min',
		'lodash': 'bower_components/lodash/lodash',
		'angular-file-upload': 'bower_components/angular-file-upload/dist/angular-file-upload',
		'angular-material': 'bower_components/angular-material/angular-material',
		'angular-animate': 'bower_components/angular-animate/angular-animate',
		'angular-aria': 'bower_components/angular-aria/angular-aria',
		'angular-material-icons': 'bower_components/angular-material-icons/angular-material-icons',
		'angular-ui-breadcrumbs': 'bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs',
		'angular-ui-title': 'bower_components/angular-ui-router-title/angular-ui-router-title',
		'angular-upload': 'bower_components/angular-upload/angular-upload.min'
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
		'angular-material-icons': {deps: ['angular']},
		'angular-ui-breadcrumbs': {deps: ['angular']},
		'angular-ui-title': {deps: ['angular']},
		'angular-upload': {deps: ['angular']}
	},	
	deps: ['app']
});