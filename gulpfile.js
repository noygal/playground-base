var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
require = require('managed-require');
require.config({
  npmLoad: {
     loglevel: 'verbose'
  }
});
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');
var del = require('del');
var less = require('gulp-less');

var paths = {
  dist : 'dist/',
  distPublic : 'dist/public',
  src : 'src/',
  js : 'src/**/*.js',
  html : 'src/**/*.html',
  less : 'src/public/style.less',
  spec : 'src/**/*.spec.js',
  clean : ['dist/**/*']
};

var watches = [];

function createGulpTask(taskName, options) {
  gulp.task(taskName, function() {
    var stream = gulp.src(options.src,{read: true});
    if (!!options.plugins)
      options.plugins.forEach(function(plugin) {
        if (!!plugin.bin)
          stream = stream.pipe(plugin.bin(plugin.options));
      });
    if (!!options.dest) 
      stream = stream.pipe(gulp.dest(options.dest));
    return stream;
  });
}

createGulpTask('build:js', {
  src : [paths.js, '!' + paths.spec],
  dest : paths.dist,
});

createGulpTask('test:js', {
  src : paths.spec,
  plugins : [{
    bin : mocha,
  }]
});

createGulpTask('build:html', {
  src : paths.html,
  dest : paths.dist,
});

createGulpTask('build:less', {
  src : paths.less,
  dest : paths.distPublic,
  plugins : [{
    bin : less
  }]
});

gulp.task('build:less1', function () {
  var stream = gulp.src(paths.less);
  stream = stream.pipe(less());
   stream =  stream.pipe(gulp.dest(paths.dist + 'public/'));
   return stream;
});

gulp.task('clean', function (cb) {
  del([
    paths.dist
  ], cb);
});

gulp.task('clean:all', function (cb) {
  del([
    paths.dist,
    'node_modules'
  ], cb);
});

gulp.task('build', ['build:js', 'build:html', 'build:less']);

//gulp.task('test', ['test:js']);

gulp.task('test', gulpSequence('build:js', 'test:js'));

gulp.task('watch', function() {
  gulp.watch([paths.js], 'test');
});

gulp.task('npm', function(cb) {
  cb();
});

//gulp.task('default', ['build', 'test', 'watch']);