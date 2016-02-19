var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine'),
    codecov = require('gulp-codecov');


gulp.task('pre-test', () => {
    return gulp.src(['lib/**/*.js'])
	   .pipe(istanbul())
       .pipe(istanbul.hookRequire()) 
});

gulp.task('test',['pre-test'], () => {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine())
        .pipe(istanbul())
        .pipe(codecov());   
});


gulp.task('default', ['test']);