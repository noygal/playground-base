var gulp = require('gulp');
require = require('managed-require');
var mocha = require('gulp-mocha');

var paths = {
  bin : 'bin/',
  src : 'src/',
  js : 'src/**/*.js',
  spec : 'src/**/*.spec.js',
}

gulp.task('build', function(cb) {
  gulp.src([paths.js, '!' + paths.spec])
    .pipe(gulp.dest(paths.bin));
  cb();
});

gulp.task('test', function(cb) {
  gulp.src([paths.spec], {read: false})
    .pipe(mocha());
  cb();
});

gulp.task('watch', function() {
  gulp.watch([paths.js], ['build', 'test']);
});

gulp.task('bt', ['build', 'test']);
gulp.task('default', ['build', 'test', 'watch']);
