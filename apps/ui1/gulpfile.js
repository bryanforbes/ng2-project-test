var gulp = require('gulp');
var setup = require('../../gulpfile-setup');

var PATH = {
	dest: {
		dev: {
			all: 'dist',
			libs: 'dist/lib',
			ts: 'dist/app'
		}
	},
	src: {
		all: 'src/**/*',
		assets: [
			'src/app/**/*.css',
			'src/app/**/*.html',
			'src/*.html',
			'src/*.js'
		],
		libs: [
			'../../node_modules/angular2/bundles/angular2-polyfills.js',
			'../../node_modules/es6-shim/es6-shim.js',
			'../../node_modules/systemjs/dist/system.src.js',
			'../../node_modules/rxjs/bundles/Rx.js',
			'../../node_modules/angular2/bundles/angular2.js',
			'../../node_modules/angular2/bundles/router.js',
			'../../node_modules/angular2/bundles/http.js'
		],
		root: 'src',
		tsconfig: 'src/tsconfig.json',
		ts: 'src/app/**/*.ts'
	},
	serve: {
		port: 8081
	}
};

setup(PATH);

gulp.task('default', [ 'serve' ]);
gulp.task('build', [ 'build.ts', 'build.assets', 'copy.libs' ]);
gulp.task('clean', [ 'clean.dist' ]);
