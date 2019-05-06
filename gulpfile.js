// const { src, dest, watch, series, parallel }  = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

var inputStyle = './app/scss/**/*.scss';
var outputStyle = './app/css';
var autoprefixerOptions = {
  // test on https://browserl.ist/
  browsers: ['last 1 version', 'Safari 9', 'Safari 10', 'Safari 11'], 
  grid: false,
  supports: true
};

// compile scss to css
function style() {
  return (
    gulp
      .src(inputStyle) // where is my scss file
      .pipe(sass().on('error', sass.logError)) // sass compiler
      .pipe(autoprefixer(autoprefixerOptions)) // add prefixer
      .pipe(gulp.dest(outputStyle)) // where to save the css file
      .pipe(browserSync.stream()) // strem to all browsers
  ); 
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });
  gulp.watch(inputStyle, style); // run the style function if there's a change in any .scss file
  gulp.watch('./app/**/*.html').on('change', browserSync.reload);
  gulp.watch('./app/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;