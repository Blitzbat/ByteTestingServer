var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine'),
    codecov = require('gulp-codecov');


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

gulp.task('codecove', ['test'], () => {
    return gulp.src(['coverage/lcov.info'])
        .pipe(codecov());
});


gulp.task('default', ['codecove']);