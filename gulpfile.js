var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var serve = require('gulp-server-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

/*Clean*/
gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe(clean(null));
});

/*Lint*/
gulp.task('lint', function () {
  //lint
});

/*Vendor*/
gulp.task('vendor', function () {
  //vendor
});

/*Build*/
gulp.task('build', function () {
  //build
});
gulp.task(':build:scss', function () {
  return gulp.src(['./scss/**/*.scss', '!./scss/**/_*'])
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: [
          'last 2 versions',
          'not ie <= 10',
          'not ie_mob <= 10',
        ],
        cascade: false,
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'));
});
gulp.task(':build:docs', function () { });

gulp.task(':build:img', function () {
  return gulp.src('./docs/assets/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('./docs/assets/img'))
});

/*Watch*/
gulp.task('watch', function () {

});

/*Serve*/
gulp.task('serve', function () {
  gulp.src('dist').pipe(serve({
    livereload: liveReload,
    fallback: 'index.html',
    port: 8001,
    open: true
  }));
  gulp.watch('./scss/**/*.scss', [':build:scss']);
  gulp.watch('./docs/**/*.html', [':build:docs']);

});

/*Release*/
gulp.task('release', function () {
  //release
});

/*Test*/
gulp.task('test', function () {
  //test
});

/*Default*/
gulp.task('default', ['serve']);
