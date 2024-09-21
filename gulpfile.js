const { src, dest, watch , parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss    = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const jshint = require('gulp-jshint');
const imagemingif = require('imagemin-gifsicle');
const fs = require('fs');

const paths = {
  scss: 'builds/scss/**/*.scss',
  js: 'builds/js/**/*.js',
  imagenes: 'builds/img/**/*',
  gif: 'builds/Gif/**/*.gif',
  order: 'builds/js/data.json'
}

const step = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  imagenes: 'src/img/**/*',
  gif: 'src/Gif/**/*.gif'
}

// css es una función que se puede llamar automaticamente
function css() {
  // console.log('Compilando SASS');
  return src(paths.scss)
    //------------------------------
    //Mensahe de error en el codigo
    .pipe(plumber({ // * 3 * //
      errorHandler: function(err) {
        notify.onError({ // * 4 * //
          title:    'Gulp Error',
          message:  '<%= error.message %>',
          sound:    'Bottle'
        })(err);
        this.emit('end'); // * 5 * //
      }
    }))
    //------------------------------
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest('./src/css'));
}

function readOrder() {
  try {
    const content = fs.readFileSync(paths.order, 'utf-8');
    return JSON.parse(content).js || [];
  } catch (error) {
    console.error(`Error reading ${paths.order}:`, error.message);
    return [];
  }
}

function javascript() {
  const order = readOrder();

  return src(order.map(file => `builds/js/${file}`))
    .pipe(jshint())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.init())
    //.pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./src/stores'));
}
/*
function javascript() {
  return src(paths.js)
    .pipe(jshint())
    .pipe(concat('bundle.js')) // final output file name
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./src/store/js'));
}

function javascriptmin() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js')) // final output file name
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./src/store/js'))
}
*/
function imagenes() {
  return src(paths.imagenes)
    .pipe(cache(imagemin({ optimizationLevel: 3})))
    .pipe(dest('src/assets/img'));
    // .pipe();
}

function versionWebp() {
  return src(paths.imagenes)
    .pipe( webp() )
    .pipe(dest('src/assets/img'))
    // .pipe(notify({ message: 'Imagen Completada'}));
}

function versionGif() {
  // console.log(paths.gif);
  // return;
  return src(paths.gif)
    .pipe( imagemin([imagemingif({interlaced: true})]))
    .pipe(dest('src/assets/gif'))
    .pipe(notify({ message: 'gif Completada'}));
}

function watchArchivos() {
  watch( paths.scss, css );
  watch( paths.js, javascript );
  //watch( paths.js, javascriptmin );
  watch( paths.imagenes, imagenes );
  watch( paths.imagenes, versionWebp );
  watch( paths.gif, versionGif );
}

exports.css = css;
exports.js = javascript;
exports.gif = versionGif;
exports.imagenes = series(imagenes, versionWebp);
exports.watchArchivos = watchArchivos;
exports.default = parallel(css, javascript, watchArchivos );
