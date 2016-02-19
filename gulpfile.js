var gulp = require('gulp'),
    jasmine = require('gulp-jasmine');

gulp.task('test', () => {
   gulp.src('tests/**/*.js')
   .pipe(jasmine()); 
});


gulp.task('default', ['test']);