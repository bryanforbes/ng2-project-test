var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var path = require('path');
var del = require('del');
var webserver = require('gulp-webserver');

gulp.task('build.ts', function () {
	var tsProject = tsc.createProject('src/tsconfig.json', {
		typescript: require('typescript')
	});

	var result = gulp.src('src/app/**/*.ts')
					 .pipe(sourcemaps.init())
					 .pipe(tsc(tsProject));

	return result.js
				 .pipe(sourcemaps.write())
				 .pipe(gulp.dest('dist/app'));
});

gulp.task('build.assets', function () {
	return gulp.src([
		'src/app/**/*.css',
		'src/app/**/*.html',
		'src/*.html',
		'src/*.js'
	]).pipe(gulp.dest('dist'));
});

gulp.task('build', [ 'build.ts', 'build.assets', 'copy.libs' ]);

gulp.task('copy.libs', function () {
	return gulp.src([
		'../../node_modules/angular2/bundles/angular2-polyfills.js',
		'../../node_modules/es6-shim/es6-shim.js',
		'../../node_modules/systemjs/dist/system.src.js',
		'../../node_modules/rxjs/bundles/Rx.js',
		'../../node_modules/angular2/bundles/angular2.js',
		'../../node_modules/angular2/bundles/router.js',
		'../../node_modules/angular2/bundles/http.js'
	]).pipe(gulp.dest('dist/lib'));
});

gulp.task('default', function () {
	gulp.src('src/**/*')
		.pipe(watch('src/**/*', batch(function (events, done) {
			events.on('data', function (file) {
				if (file.event !== 'unlink') {
					return;
				}

				var filePathFromSrc = path.relative(path.resolve('src'), file.path);
				var destFilePath = path.resolve('dist', filePathFromSrc);

				if (path.extname(destFilePath) === '.ts') {
					destFilePath = destFilePath.slice(0, -3) + '.js';
				}

				del.sync(destFilePath);
			});
			events.on('end', function () {
				gulp.start('build', done);
			});
		})));

	gulp.src('dist')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 8080,
			fallback: 'index.html',
			livereload: true,
			directoryListing: false
		}));
});
