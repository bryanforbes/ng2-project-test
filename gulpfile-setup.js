var gulp = require('gulp');
var di = require('gulp-di');
var _ = require('lodash');
var path = require('path');

var baseOptions = {
    pattern: [
        'gulp-*',
        'gulp.*',
        'del',
		'run-sequence',
		'typescript'
    ],
    rename: {
        'run-sequence': 'runSequence',
		'gulp-typescript': 'tsc'
    }
};

module.exports = function (PATH, options) {
	options = _.defaultsDeep(options || {}, baseOptions);

	di(gulp, options)
		.provide({ PATH: PATH })
		.tasks(path.join(__dirname, 'tasks'))
		.resolve();
};
