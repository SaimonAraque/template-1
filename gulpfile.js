var jade = require('gulp-jade');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulp_watch_jade = require('gulp-watch-jade');

gulp.task('sass', function() {
  gulp.src('./scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
  }))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
});


gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    //gulp.watch("./scss/components/*.scss", ['sass']);
    gulp.watch("./scss/**/*.scss", ['sass']); 
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch('./jade/**/*.jade', ['jade']);
});


gulp.task('jade', function() {
  gulp.src('./jade/*.jade')
        .pipe(jade({pretty: true })) // pip to jade plugin
        .pipe(gulp.dest('./')); // tell gulp our output folder
});
