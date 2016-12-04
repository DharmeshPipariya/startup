var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var serve = require('gulp-server-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

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
  return gulp.src('./scss/**/*.scss')
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

/*Watch*/
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', [':build:scss']);
  gulp.watch('./docs/**/*.html', [':build:docs']);
});

/*Serve*/
gulp.task('serve', function () {
  return gulp.src('dist').pipe(serve({
    livereload: liveReload,
    fallback: 'index.html',
    port: 8001,
    open: true
  }));
});

/*Release*/
gulp.task('release', function () {
  //release
});

/*Test*/
gulp.task('test', function () {
  //test
});


gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./css'));
});

gulp.task('default', ['serve']);
