'use strict';

var fs          = require('fs');
var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var eslint      = require('gulp-eslint');
var rimraf      = require('rimraf');
var assign      = require('lodash/object/assign');
var browserSync = require('browser-sync');

var config = {
  src: './src/app.js',
  dest: './public/',
  output: 'app.js',
  bs: {
    server: { baseDir: './' },
    open: false,
    notify: false
  }
};

gulp.task('default', ['clean' ,'js']);

/**
 * Delete (or clean out) the output directory.
 */
gulp.task('clean', function(cb){
  rimraf(config.dest, cb);
});

/**
 * Run ES6/JavaScript linter.
 */
gulp.task('lint', function () {
  return gulp.src(['./src/*.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
});

/**
 * Browserify and transpile ES6 -> ES5.
 * Watch JS changes with `watchify` for speedy builds.
 */
var opts = assign({}, watchify.args, {
  entries: [config.src],
  debug: true
});

var b = watchify(browserify(opts)).transform(babelify);
var bundle = function() {
  return b.bundle()
    .on('error', function(err) {
      console.log('Error: ' + err.message);
    })
    .pipe(source(config.output))
    .pipe(buffer())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
};

gulp.task('js', ['lint'], bundle);
b.on('update', function() { gulp.start('js') });

/**
 * Local server + watch for updates.
 */
gulp.task('serve', ['clean', 'js'], function () {
  browserSync.init(config.bs);
});
