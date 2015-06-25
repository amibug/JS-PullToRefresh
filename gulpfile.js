var gulp = require('gulp');
var webpack = require('gulp-webpack');
var rename = require("gulp-rename");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var path = require('path');

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [
    path.join(sourceDirectory, '/*.js')
];

var libraryName  = 'jqury.pullToRefresh';

gulp.task('build', function() {
    return gulp.src(sourceDirectory + '/' + libraryName + '.js')
        .pipe(webpack({
            output: {
                filename: libraryName + '.js',
                path: __dirname,
                library: "jqury.pullToRefresh",
                libraryTarget: 'umd'
            }
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename(libraryName + '.min.js'))
        .pipe(gulp.dest('dist/'));
 });


/**
 * Validate source JavaScript
 */

gulp.task('jshint-src', function () {
    return gulp.src(sourceFiles)
        .pipe(plumber())
        .pipe(jshint({
            reporter: 'default'
        }))
        //.pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('default',['jshint-src', 'build']);