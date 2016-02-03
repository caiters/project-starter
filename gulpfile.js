var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
//var watch = require('gulp-watch');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

gulp.task('css', function(){
  var cssSrc = 'css/**/*.less',
      cssDest = 'css';
  gulp.src(cssSrc, {base: 'css/less'})
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(cssnano())
    .pipe(sourcemaps.write('maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(cssDest))
    .pipe(livereload());
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('html', function(){
  gulp.src('./*.html')
    .pipe(livereload());
});

gulp.task('watch:html', function(){
  gulp.watch(['./*.html'], ['html'])
});

gulp.task('watch:css', ['css'], function(){
  livereload.listen();
  gulp.watch('css/**/*.less', ['css']);
});

gulp.task('default', ['watch:css', 'connect', 'watch:html']);
