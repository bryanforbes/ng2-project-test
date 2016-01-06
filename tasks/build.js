module.exports = function (gulp, PATH, tsc, typescript, sourcemaps, runSequence) {
	gulp.task('build.ts', function () {
		var tsProject = tsc.createProject(PATH.src.tsconfig, {
			typescript: typescript
		});

		var result = gulp.src(PATH.src.ts)
						 .pipe(sourcemaps.init())
						 .pipe(tsc(tsProject));

		return result.js
					 .pipe(sourcemaps.write())
					 .pipe(gulp.dest(PATH.dest.dev.all));
	});

	gulp.task('build.assets', function () {
		return gulp.src(PATH.src.assets)
				   .pipe(gulp.dest(PATH.dest.dev.all));
	});
};
