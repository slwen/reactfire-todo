'use strict';

var fs           = require('fs');
var gulp         = require('gulp');
var ghPages      = require('gulp-gh-pages');
var gulpif       = require('gulp-if');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var browserify   = require('browserify');
var watchify     = require('watchify');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var eslint       = require('gulp-eslint');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rimraf       = require('rimraf');
var assign       = require('lodash/object/assign');
var browserSync  = require('browser-sync');

var config = {
  production: process.env.NODE_ENV === 'production',
  input: './src/app.js',
  output: 'app.js',
  scss: './src/**/*.scss',
  dest: './public/',
  browserSync: {
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
    entries: [config.input],
    debug: !config.production,
    fullPaths: !config.production,
    cache: {},
    packageCache: {}
  }).transform(babelify);

  var rebundle = function() {
    bundler.bundle()
      .on('error', function(err) {
        console.log('Bundle Error: ' + err.message);
      })
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe(gulpif(config.production, uglify()))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream());
  }

  // Watch for changes if we're not in production
  if (!config.production) {
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

gulp.task('scss', function() {
  gulp.src(config.scss)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public'));
});

gulp.task('scss:watch', ['scss'], function () {
  gulp.watch(config.scss, ['scss']).on('change', browserSync.reload);
});

/**
 * Local server + watch for updates.
 */
gulp.task('serve', ['clean', 'js', 'scss:watch'], function () {
  browserSync.init(config.browserSync);
});

/**
 * Deploy output files to gh-pages.
 */
gulp.task('deploy', function() {
  return gulp.src(config.dest + '**/*')
    .pipe(ghPages());
});
