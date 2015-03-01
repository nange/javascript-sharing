var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

gulp.task('minify', function () {
  gulp.src('shoppingCart/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('shoppingCart/js/build'))
});

gulp.task('connect', function() {
  connect.server();
});
