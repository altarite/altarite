const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const css = (done) => {
    //compilando sass
    src('src/assets/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))
    done();
}

const dev = () => {
    watch('src/assets/scss/**/*.scss', css);
}
exports.css=css;
exports.default=series(css,dev);