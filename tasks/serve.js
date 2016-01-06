module.exports = function (gulp, PATH, watch, batch, del, webserver) {
	var path = require('path');
	gulp.task('serve', function () {
		gulp.src(PATH.src.all)
			.pipe(watch(PATH.src.all, batch(function (events, done) {
				events.on('data', function (file) {
					if (file.event !== 'unlink') {
						return;
					}

					var filePathFromSrc = path.relative(path.resolve(PATH.src.root), file.path);
					var destFilePath = path.resolve(PATH.dest.dev.all, filePathFromSrc);

					if (path.extname(destFilePath) === '.ts') {
						destFilePath = destFilePath.slice(0, -3) + '.js';
					}

					del.sync(destFilePath);
				});
				events.on('end', function () {
					gulp.start('build', done);
				});
			})));

		gulp.src(PATH.dest.dev.all)
			.pipe(webserver({
				host: PATH.dest.dev.host,
				port: PATH.dest.dev.port,
				fallback: PATH.dest.dev.index,
				livereload: true,
				directoryListing: false
			}));
	});
};
