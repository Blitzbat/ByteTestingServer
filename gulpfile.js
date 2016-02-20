var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine'),
    coveralls = require('gulp-coveralls');


gulp.task('pre-test', () => {
    return gulp.src(['lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine())
        .pipe(istanbul())
        .pipe(istanbul.writeReports())
});

gulp.task('coveralls', ['test'], () => {
    return gulp.src(['coverage/**/lcov.info'])
        .pipe(coveralls());
});

gulp.task('default', ['coveralls']);