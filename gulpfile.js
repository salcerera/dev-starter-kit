// Put all requirements inside a variable
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync').create();

// All Gulp task here

// Static Server + watching scss/html/php files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/*php").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Connec to PHP Server
gulp.task('connect', function() {
    connect.server();
});

// minify css file for production
gulp.task('minify-css', function() {
    return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// uglify js file for production
gulp.task('uglify-js', function() {
    return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// minify html file for production
gulp.task('minify-html', function() {
    return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// minify jpeg images for production
gulp.task('minify-jpeg', function() {
    gulp.src('/app/img/*.jpeg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// minify jpg images for production
gulp.task('minify-jpg', function() {
    gulp.src('/app/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// minify jpeg images for production
gulp.task('minify-png', function() {
    gulp.src('/app/img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// minify jpeg images for production
gulp.task('minify-svg', function() {
    gulp.src('/app/img/*.svg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// compile all the task anb perform it in sequence
gulp.task('build', ['serve', 'connect']);
gulp.task('export', ['minify-css', 'minify-html', 'uglify-js', 'minify-jpg', 'minify-jpeg', 'minify-png', 'minify-svg']);

//gulp default task which will perform all the task at one go
gulp.task('default', ['build']);
