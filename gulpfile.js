var gulp = require("gulp");
var inject = require("gulp-inject");
var wrap = require("gulp-wrap");
var rename = require("gulp-rename");
var del = require("del");

var paths = {
  nodeModules: './node_modules/',
  src: './Src/',
  dist: './Dist/',
};
paths.jsLibsSrc = paths.src + "Scripts/lib/";
paths.cssLibsSrc = paths.src + "Content/lib/";
paths.jsLibsDest = paths.dist + "Scripts/lib/";
paths.cssLibsDest = paths.dist + "Content/lib/";
config = {
  jsLibs: [
      paths.nodeModules + 'jquery/dist/jquery.js',
      paths.nodeModules + 'bootstrap/dist/js/bootstrap.js'
  ],
  cssLibs: [
      paths.nodeModules + '/bootstrap/dist/css/bootstrap.css'
  ]
};

gulp.task('default', ['inject:layout']);

gulp.task('scripts:clean', function () {
  return del([paths.jsLibsSrc]);
});

gulp.task('scripts:moveToSrc', ['scripts:clean'], function () {
  return gulp.src(config.jsLibs)
    .pipe(gulp.dest(paths.jsLibsSrc));
});

gulp.task('styles:clean', function () {
  return del([paths.cssLibsSrc]);
});

gulp.task('styles:moveToSrc', ['styles:clean'], function () {
  return gulp.src(config.cssLibs)
    .pipe(gulp.dest(paths.cssLibsSrc));
});

gulp.task('dist:clean', ['scripts:moveToSrc', 'styles:moveToSrc'], function () {
  return del(paths.dist);
});

gulp.task('html:wrap', ['dist:clean'], function () {
  return gulp.src([paths.src + '**/*.html', '!' + paths.src + '**/_*.html'])
      .pipe(wrap({ src: paths.src + '_layout.html' }))
      .pipe(gulp.dest(paths.dist));
});

gulp.task('files:moveToDist', ['html:wrap'], function () {
  return gulp.src([paths.src + '**/*.js', paths.src + '**/*.css', paths.src + '**/*.png'])
      .pipe(gulp.dest(paths.dist));
});

gulp.task('inject:layout', ['files:moveToDist'], function () {
  var target = gulp.src(paths.dist + "**/*.html");
  var sources = gulp.src([paths.jsLibsDest + '*.js', paths.cssLibsDest + '*.css'], { read: false });
  return target.pipe(inject(sources, { relative: true }))
       .pipe(gulp.dest(paths.dist));
});

gulp.task('html:watch', function () {
  gulp.watch(paths.src + '**/*.html', ['inject:layout']);
});