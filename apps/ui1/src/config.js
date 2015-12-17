System.config({
	defaultJSExtensions: true,
	packages: {
		app: {
			format: 'register',
			defaultExtension: 'js'
		}
	},
	bundles: {
		'lib/router': [
			'angular2/router'
		],
		'lib/http': [
			'angular2/http'
		],
		'lib/angular2': [
			'angular2/core',
			'angular2/common',
			'angular2/compiler',
			'angular2/platform/browser'
		]
	},
	meta: {
		'lib/angular2-polyfills': {
			exports: 'Reflect',
			format: 'global'
		},
		'lib/es6-shim': {
			exports: 'Symbol',
			format: 'register'
		},
		'lib/Rx': {
			format: 'register'
		},
		'lib/angular2': {
			format: 'register',
			deps: [ 'lib/Rx' ]
		},
		'lib/router': {
			format: 'register',
			deps: [ 'lib/angular2' ]
		},
		'lib/http': {
			format: 'register',
			deps: [ 'lib/angular2' ]
		}
	}
});
