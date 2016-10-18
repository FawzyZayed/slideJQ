'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Start browser-sync Static Server + watching scss/html files
gulp.task('run', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(postcss([ autoprefixer({ browsers: ['last 100 versions'] }) ]))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

// Minify CSS & Concatenates files
gulp.task('min:css', function() {
   return gulp.src(['assets/css/3-red.css', 'assets/css/2-green.css', 'assets/css/1-blue.css'])
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('color.css', {newLine: ''}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('ui/assets/css'));
});