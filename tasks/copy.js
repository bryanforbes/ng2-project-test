module.exports = function (gulp, PATH) {
	gulp.task('copy.libs', function () {
		return gulp.src(PATH.src.libs)
				   .pipe(gulp.dest(PATH.dest.dev.libs));
	});
};
