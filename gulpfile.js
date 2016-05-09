var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch(['*.html']);
});

gulp.task('webserver', function () {
  gulp.src('.')
    .pipe(webserver({
      port: 8001,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['sass', 'webserver', 'watch']);