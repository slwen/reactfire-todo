'use strict';

var fs           = require('fs');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
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
var imagemin     = require('gulp-imagemin');

var config = {
  production: !!gutil.env.production,
  input: './src/app.js',
  output: 'app.js',
  scss: './src/**/*.scss',
  html: './src/**/*.html',
  images: './src/images/*',
  dest: './public/',
  browserSync: {
    server: { baseDir: './public/' },
    open: false,
    notify: false
  }
};

process.env.NODE_ENV = config.production ? 'production' : 'development';

gulp.task('default', ['lint', 'js', 'scss', 'images', 'html']);

gulp.task('clean', function(cb){
  rimraf(config.dest, cb);
});

gulp.task('lint', function () {
  return gulp.src(['./src/*.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
});

/**
 * Browserify and transpile ES6 -> ES5.
 * Watch JS changes with `watchify` for speedy builds.
 */
gulp.task('js', ['lint'], function() {
  var bundler = browserify({
    entries: [config.input],
    debug: !config.production,
    fullPaths: !config.production,
    cache: {},
    packageCache: {}
  }).transform(babelify);

  var rebundle = function() {
    return bundler.bundle()
      .on('error', function(err) {
        console.log('Bundle Error: ' + err.message);
      })
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe(gulpif(config.production, uglify()))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream());
  }

  if (!config.production) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      gulp.start('lint');
      rebundle();
    });
  }

  return rebundle();
});

gulp.task('scss', function() {
  gulp.src('./src/app.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src(config.images)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest + '/images'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src(config.html)
    .pipe(gulp.dest(config.dest));
});

gulp.task('watch', ['js'], function () {
  gulp.watch(config.scss, ['scss']);
  gulp.watch(config.images, ['images']);
  gulp.watch(config.html, ['html']).on('change', browserSync.reload);
});

gulp.task('serve', ['default', 'watch'], function () {
  browserSync.init(config.browserSync);
});

gulp.task('deploy', function() {
  return gulp.src(config.dest + '**/*')
    .pipe(ghPages());
});
