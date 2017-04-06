var app, base, concat, directory, gulp, gutil, hostname, path, refresh, sass, uglify, del, connect, autoprefixer, imagemin, wrap, inject, babel;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

gulp = require('gulp');
gutil = require('gulp-util');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
sass = require('gulp-sass');
connect = require('gulp-connect');
del = require('del');
autoprefixer = require('gulp-autoprefixer');
imagemin = require('gulp-imagemin');
wrap = require('gulp-wrap');
inject = require('gulp-inject');
babel = require('gulp-babel');

gulp.task('clean', function () {
  del('dist');
});

gulp.task(':lint:scss', function () { });

gulp.task(':lint:js', function () { });

gulp.task('lint', [':lint:scss', ':lint:js'], function () { });

gulp.task('libs', function () {
  //return gulp.src([paths.src + '**/*.js', paths.src + '**/*.css', paths.src + '**/*.png'])
  //    .pipe(gulp.dest(paths.dist));
});

gulp.task(':build:js', function () { });

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

gulp.task(':build:html', function () {
  gulp.src(['./docs/**/*.html', '!./docs/**/_*.html'])
        .pipe(wrap({ src: './docs/_layout.html' }))
        .pipe(gulp.dest('./dist'));

  return gulp.src('./dist/**/*.html')
    .pipe(inject(gulp.src(['./docs/**/*.js', './docs/**/*.css'], { read: false }), { relative: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task(':build:img', function () {
  return gulp.src('./docs/assets/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./docs/assets/img'))
});

gulp.task('build', ['clean'], function () {
  gulp.start(':build:js', ':build:scss', ':build:html', ':build:img');
});

gulp.task('connect', function () {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('images-deploy', function () {
  gulp.src(['app/images/**/*'])
      .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function () {
  //this is where our dev JS scripts are
  return gulp.src('app/scripts/src/**/*.js')
             .pipe(babel({ presets: ['es2015', 'react'] }))
             .pipe(concat('app.js'))
             .on('error', gutil.log)
             .pipe(uglify())
             .pipe(gulp.dest('app/scripts'))
             .pipe(connect.reload());
});

gulp.task('scripts-deploy', function () {
  return gulp.src('app/scripts/src/**/*.js')
             .pipe(concat('app.js'))
             .pipe(uglify())
             .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function () {
  return gulp.src('app/styles/scss/init.scss')
             .pipe(sass({
               errLogToConsole: true,
               includePaths: [
                   'app/styles/scss/'
               ]
             }))
             .pipe(autoprefixer({
               browsers: autoPrefixBrowserList,
               cascade: true
             }))
             .on('error', gutil.log)
             .pipe(concat('styles.css'))
             .pipe(gulp.dest('app/styles'))
             .pipe(connect.reload());
});

gulp.task('styles-deploy', function () {
  return gulp.src('app/styles/scss/init.scss')
             .pipe(sass({
               includePaths: [
                   'app/styles/scss',
               ]
             }))
             .pipe(autoprefixer({
               browsers: autoPrefixBrowserList,
               cascade: true
             }))
             .pipe(concat('styles.css'))
             .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
      .pipe(connect.reload())
       .on('error', gutil.log);
});

gulp.task('html-deploy', function () {
  gulp.src('app/*')
      .pipe(gulp.dest('dist'));

  gulp.src('app/.*')
      .pipe(gulp.dest('dist'));

  gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));

  gulp.src(['app/styles/*.css', '!app/styles/styles.css'])
      .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', ['connect', 'scripts', 'styles'], function () {
  gulp.watch('app/scripts/src/**', ['scripts']);
  gulp.watch('app/styles/scss/**', ['styles']);
  gulp.watch('app/*.html', ['html']);
});

gulp.task('deploy', ['clean'], function () {
  gulp.start('scripts-deploy', 'styles-deploy', 'html-deploy', 'images-deploy');
});
