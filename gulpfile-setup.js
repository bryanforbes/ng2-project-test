var gulp = require('gulp');
var di = require('gulp-di');
var _ = require('lodash');
var path = require('path');

var baseOptions = {
	rename: {
		'gulp-typescript': 'tsc'
	},
	modules: {
		typescript: 'typescript',
		del: 'del',
		path: 'path'
	}
};

var basePATH = {
	serve: {
		host: '0.0.0.0',
		port: 8080,
		index: 'index.html',
		livereload: {
			enable: true
		}
	}
};

module.exports = function (PATH, options) {
	PATH = PATH || {};
	options = options || {};

	options = _.defaultsDeep(options, baseOptions);
	var modules = options.modules || {};
	options = _.omit(options, 'modules');

	var moduleHash = {};
	for (var name in modules) {
		(function (name) {
			var module;
			Object.defineProperty(moduleHash, name, {
				enumerable: true,
				value: function () {
					return module || (module = require(modules[name]));
				}
			});
		})(name);
	}

	PATH = _.defaultsDeep(PATH, basePATH);

	di(gulp, options)
		.provide({ PATH: PATH })
		.module(moduleHash)
		.tasks(path.join(__dirname, 'tasks'))
		.resolve();
};
