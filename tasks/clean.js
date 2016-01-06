module.exports = function (gulp, PATH, del) {
	gulp.task('clean.tmp', function (done) {
		del('tmp', done);
	});
	gulp.task('clean.dist', function (done) {
		del(PATH.dest.dev.all, done);
	});
};
