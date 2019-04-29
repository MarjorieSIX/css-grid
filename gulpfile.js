const { src, dest, watch, series, parallel }  = require('gulp');
// const gulp = require('gulp'),
const browserSync = require('browser-sync').create(),
const sass = require('gulp-sass'),
const del = require('del'),
const autoprefixer = require('gulp-autoprefixer');

const files = {
  scssPath = './app/**/*.scss',
  jsPath = './app/**/*.js'
}
// var inputStyle = './app/**/*.scss';
var outputStyle = './app/css';
var autoprefixerOptions = {
  // tester sur https://browserl.ist/
  browsers: ['last 1 version', 'Safari 9', 'Safari 10', 'Safari 11'], 
  grid: false,
  supports: true
};

// compile scss to css
function style() {
  return gulp.src(files.scssPath) // where is my scss file
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError)) // sass compiler
    .pipe(autoprefixer(autoprefixerOptions)) // add prefixer
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputStyle)) // where to save the css file
    .pipe(browserSync.stream()); // strem to all browsers
}

function watch() {
  browserSync.init({
    server: "./app"
  });
  gulp.watch(inputStyle, style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
