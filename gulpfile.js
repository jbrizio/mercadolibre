var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');

gulp.task('build', ['minify-js', 'minify-css', 'minify-html'], function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: {
                enable: true,
                path: 'dist/'
            },
            open: true,
            port: 3030,
            fallback: 'index.html'
        }));
});

gulp.task('minify-js', function(){
    return gulp.src(['src/assets/scripts/jquery-1.10.2.min.js', 'src/assets/scripts/chico.min.js', 'src/assets/scripts/app.js'])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist/assets/scripts/'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/scripts/'));
});

gulp.task('minify-css', function(){
    return gulp.src(['src/assets/css/chico.css', 'src/assets/css/mesh.css', 'src/assets/css/base.css'])
        .pipe(minify())
        .pipe(concat('concat.css'))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(rename('base.min.css'))
        .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('minify-html', function() {
    return gulp.src('src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});