var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
// require = require('managed-require');
// require.config({
//   npmLoad: {
//      loglevel: 'verbose',
//      save-dev : true
//   }
// });
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');
var del = require('del');
var less = require('gulp-less');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var managedBower = require('managed-bower');

var paths = {
  dist : 'dist/',
  distPublic : 'dist/public',
  src : 'src/',
  js : 'src/**/*.js',
  jsPublic : 'src/public/app.js',
  jsPublicAll : 'src/public/**/*.js',
  html : 'src/**/*.html',
  less : 'src/public/style.less',
  spec : 'src/**/*.spec.js',
  clean : ['dist/**/*']
};

var watches = [];

function createGulpTask(taskName, options) {
  watches.push({
    src : options.src,
    task: taskName
  });
  gulp.task(taskName, function() {
    var stream = gulp.src(options.src);
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
  src : [paths.js, '!' + paths.spec, '!' + paths.jsPublic],
  dest : paths.dist,
  plugins : [{
    bin: babel
  }]
});

gulp.task('build:jsPublic', function() {
    browserify({
      entries: paths.jsPublic,
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.distPublic));
});

createGulpTask('test:js', {
  src : paths.spec,
  plugins : [{
    bin : mocha
  }]
});

createGulpTask('build:html', {
  src : paths.html,
  dest : paths.dist,
  plugins : [{
    bin : managedBower,
    options : {
      directory : paths.distPublic + '/vendors'
    }
  }]
});

createGulpTask('build:less', {
  src : paths.less,
  dest : paths.distPublic,
  plugins : [{
    bin : less
  }]
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

gulp.task('serve', function () {
  nodemon({
    script: paths.dist + 'server.js',
    watch : paths.distPublic
    })
    .on('restart', function () {
//      console.log('restarted!');
    });
});

gulp.task('build', ['build:js', 'build:html', 'build:less', 'build:jsPublic']);

gulp.task('test', gulpSequence('build:js', 'test:js'));

gulp.task('watch', function() {
  watches.forEach(function(watch) {
    gulp.watch(watch.src, [watch.task]);
  });
   gulp.watch(paths.jsPublicAll, ['build:jsPublic']);
});

gulp.task('dev', gulpSequence('build', 'watch', 'serve'));

gulp.task('default', ['dev']);

gulp.task('npm', function(cb) {
  cb();
});
