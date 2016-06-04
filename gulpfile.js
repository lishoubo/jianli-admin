var gulp = require('gulp'),
    swig = require('gulp-swig'),
    minifyHtml = require("gulp-minify-html"),
    less = require("gulp-less"),
    webpack = require('gulp-webpack'),
    browserSync = require('browser-sync').create();

var paths = {
    html: 'src/app/**/*.html',
    js: 'src/app/**/*.js',
    css: 'src/css/**/*.less',
    img: 'src/img/*'
};


gulp.task('build-html', function () {
    gulp.src([paths.html])
        .pipe(swig({
            defaults: {cache: false}
        }))
        // .pipe(minifyHtml())
        .pipe(gulp.dest('./dist/'))
});

gulp.task('build-css', function () {
    gulp.src([paths.css])
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-img', function () {
    gulp.src([paths.img])
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('webpack', function () {
    gulp.src(paths.js)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist'))
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.html, ['build-html']);
    gulp.watch(paths.js, ['webpack']);
    gulp.watch('src/css/**/*.less', ['build-css']);
});

gulp.task('default', ['watch', 'build-html', 'webpack', 'build-css', 'build-img', 'server']);