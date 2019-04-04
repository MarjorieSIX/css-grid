var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var input = './app/scss/*.scss';
var output = './app/css';
var autoprefixerOptions = {
  browsers: ['last 1 version', 'Safari 11', 'Chrome 9'], // tester sur https://browserl.ist/
  grid: true,
  supports: true
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./app"
  });
  gulp.watch(input, ['sass']);
  gulp.watch("./app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions)) //.pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
    //.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
});

gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);