const { src, dest, series, parallel, watch } = require('gulp');

const browsersync = require('browser-sync').create();

const rename = require("gulp-rename");
const jsmin = require('gulp-uglify');
const imgmin = require('gulp-image');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const cssimport = require('gulp-cssimport');
const postcss = require('gulp-postcss');
const customedia = require('postcss-custom-media');
const autoprefixer = require('autoprefixer');

function sync() {
    browsersync.init({
        server: {
            index: 'index.html'
        }
    });
}

function html() {
    return src('*.html')

    .pipe(browsersync.stream())
}

function css() {
    return src('src/assets/scss/*.scss')

    .pipe(cssimport())

    .pipe(postcss([
        autoprefixer(),
        customedia()
    ]))

    .pipe(sass({
        outputStyle:'compressed'
    }))

    .pipe(rename({
        extname:'.min.css'
    }))

    .pipe(dest('dist/assets/css'))

    .pipe(browsersync.stream())
}

function js() {
    return src('src/assets/js/*.js')

    .pipe(babel({
        presets:['@babel/env']
    }))

    .pipe(jsmin())

    .pipe(rename({
        extname:'.min.js'
    }))

    .pipe(dest('dist/assets/js/'))

    .pipe(browsersync.stream())
}

function img() {
    return src('src/assets/img/**')

    .pipe(imgmin())

    .pipe(dest('dist/assets/img'))
}

function att() {
    watch(['./src/assets/scss/*.scss'], css);

    watch(['./src/assets/js/*.js'], js);

    watch(['./index.html'], html);
}

exports.default = series(
    parallel(html, css, js, img),
    
    parallel(sync, att)
);