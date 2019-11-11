const { src, dest, watch, series, parallel } = require('gulp');
const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

var inputStyle = './app/**/*.scss',
    outputStyle = './app/css';

var autoprefixerOptions = {
  grid: false,
  supports: true
};

// compile scss to css
function style() {
  return gulp.src(inputStyle) // where is my scss file
    //.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError)) // sass compiler
    .pipe(autoprefixer(autoprefixerOptions)) // add prefixer
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(outputStyle)) // where to save the css file
    .pipe(browserSync.stream()); // strem to all browsers
}

function serve() {
  browserSync.init({
    server: "./app"
  });
  gulp.watch(inputStyle, style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.serve = serve;