## gulp
1. node.js 설치
2. gulp 설치
```
npm init
npm i -g gulp-cli // 전역설치 (global)
npm i -D gulp // 작업시 해당 로컬 설치 (폴더 내)
```
> `npm i -g gulp-cli` == `npm install -g gulp`

> `npm i -D gulp` == `npm install --save-dev gulp`

3.  모듈 설치 및 gulpfile.js 세팅
* **모듈 설치**
    * https://www.npmjs.com/
        * gulp-w3cjs
        * gulp-csslint
        * gulp-sass
        * gulp-sourcemaps
        * [browsersync](https://browsersync.io/docs/gulp)
* **gulpfile.js**
```
var gulp = require('gulp'),
    csslint = require('gulp-csslint'),
    w3cjs = require('gulp-w3cjs'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
    

// vali
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(w3cjs())
        .pipe(w3cjs.reporter());
});

// CSS Lint
gulp.task('css', function() {
    gulp.src('css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter());
});

// sass
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});

// browser sync
gulp.task('bs', function () { 
    browserSync.init({ 
        proxy: 'localhost',
        port: 3333
    });
    gulp.watch('*.*').on('change', reload);
    gulp.watch('css/*.*').on('change', reload);
    gulp.watch('js/*.*').on('change', reload);
});

gulp.task('watch', ['sass','sass:watch']);
```