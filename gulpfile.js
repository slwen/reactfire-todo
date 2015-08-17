'use strict';

var fs          = require('fs');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var uglify      = require('gulp-uglify');
var eslint      = require('gulp-eslint');
var rimraf      = require('rimraf');
var assign      = require('lodash/object/assign');
var browserSync = require('browser-sync');

var production = (process.env.NODE_ENV === 'production');

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
var runBrowserify = function() {
  var bundler = browserify({
    entries: [config.src],
    debug: !production,
    cache: {}, packageCache: {}, fullPaths: true // Watchify junk
  }).transform(babelify);

  var rebundle = function() {
    bundler.bundle()
      .on('error', function(err) {
        console.log('Bundle Error: ' + err.message);
      })
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe(gulpif(production, uglify()))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream());
  }

  // Watch for changes if we're not in production
  if (!production) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      gulp.start('lint');
      rebundle();
    });
  }

  rebundle();
};

gulp.task('js', ['lint'], function() {
  runBrowserify();
});

/**
 * Local server + watch for updates.
 */
gulp.task('serve', ['clean', 'js'], function () {
  browserSync.init(config.bs);
});
