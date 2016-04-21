require.config({
	paths: {
		'angular': 'src/bower_components/angular/angular',
		'angular-ui-router': 'src/bower_components/angular-ui-router/release/angular-ui-router.min',
		'restangular': 'src/bower_components/restangular/dist/restangular.min',
		'lodash': 'src/bower_components/lodash/lodash',
		'angular-file-upload': 'src/bower_components/angular-file-upload/dist/angular-file-upload',
		'angular-material': 'src/bower_components/angular-material/angular-material',
		'angular-animate': 'src/bower_components/angular-animate/angular-animate',
		'angular-aria': 'src/bower_components/angular-aria/angular-aria',
		'angular-ui-breadcrumbs': 'src/bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs',
		'angular-ui-title': 'src/bower_components/angular-ui-router-title/angular-ui-router-title',
		'ng-file-upload': 'src/bower_components/ng-file-upload/ng-file-upload.min',
		'angular-material-data-table': 'src/bower_components/angular-material-data-table/dist/md-data-table.min',
		'n3-charts-pie-chart': 'src/bower_components/n3-charts/pie-chart.min',
		'd3': 'src/bower_components/d3/d3.min',
		'ng-messages': 'src/bower_components/angular-messages/angular-messages.min'
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
		'n3-charts-pie-chart': {deps: ['angular']},
		'ng-messages': {deps: ['angular']}
	}
});
require(['facts']);