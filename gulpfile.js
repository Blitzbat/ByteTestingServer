var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    reporters = require('jasmine-reporters');

gulp.task('test', () => {
   gulp.src('tests/**/*.js')
   .pipe(jasmine()); 
});


gulp.task('default', ['test']);