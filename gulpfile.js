// Moduls

const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const webp = require('gulp-webp');
const del = require('del');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');


const ttfToWoff = require("gulp-ttf-to-woff");


const srcFolder = './src';
const buildFolder = './app';
const paths = {
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcStyle: `${srcFolder}/scss`,
  srcScss: `${srcFolder}/scss/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcJsFolder: `${srcFolder}/js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
};



const removeBuild = () =>{
    return del([buildFolder]);
}


const fonts = () => {
    return src(`${srcFolder}/fonts/**/*.ttf`)
    .pipe(ttfToWoff())
    .pipe(dest(`${buildFolder}/fonts/`));

}

const scss = () =>{
    src(`${paths.srcScss}`)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest(`${paths.buildCssFolder}`)) 
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${paths.buildCssFolder}`))
        .pipe(browserSync.stream());

    return src(`${paths.srcStyle}/libs/*.{scss,css,sass}`)
        .pipe(concat('libs.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${paths.buildCssFolder}`))
}


const html = () => {
    return src(`${srcFolder}/*.html`)
    .pipe(fileinclude({
        prefix: '@',
        basepath: '@file'
    }))
    .pipe(dest(`${buildFolder}`))
    .pipe(browserSync.stream());
}


const images = () => {
    src(`${paths.srcImgFolder}/**/*.{jpg,jpeg,png,gif,ico}`)
    .pipe(dest(`${paths.buildImgFolder}`))
    .pipe(webp({
        quality: 100
    }))
    .pipe(dest(`${paths.buildImgFolder}`))

    return src(`${paths.srcImgFolder}/**/*.{svg,webp}`)
    .pipe(dest(`${paths.buildImgFolder}`))

}



const js = () =>{
    src(`${paths.srcJsFolder}/libs/*.js`)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(dest(paths.buildJsFolder))
    return src(`${paths.srcJsFolder}/*.js`)
    .pipe(dest(paths.buildJsFolder))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
    
}




const watching = () =>{
    browserSync.init({
        server:{
            baseDir: `${buildFolder}`
        }
    });

    watch(`${paths.srcScss}`, scss);
    watch(`${paths.srcStyle}/libs/*.{scss,css,sass}`, scss);
    watch(`${paths.srcStyle}/components/*.scss`, scss);
    watch(`${paths.srcPartialsFolder}/*.html`, html); 
    watch(`${srcFolder}/*.html`, html);
    watch(`${paths.srcImgFolder}/**/*.{jpg,jpeg,png,gif,ico,webp,svg}`, images);
    watch(`${paths.srcJsFolder}/libs/*.js`, js);
    watch(`${paths.srcJsFolder}/*.js`, js);
    watch(`${srcFolder}/fonts/**/*.ttf`, fonts);

}

exports.styles = scss;
exports.watching = watching;
exports.default = series(removeBuild, html, scss, images, js, fonts, watching);