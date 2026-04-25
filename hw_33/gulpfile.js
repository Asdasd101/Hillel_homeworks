const { src, dest, watch, task, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const pug = require('gulp-pug');

const PATH = {
  scssRootFile: './assets/scss/style.scss',
  scssAllFiles: './assets/scss/**/*.scss',
  scssFolder:   './assets/scss/',
  cssFolder:    './assets/css/',
  htmlFolder:   './',
  htmlAllFiles: './*.html',
  jsFolder:     './assets/js/',
  jsAllFiles:   './assets/js/**/*.js',
  pugAllFiles:  './*.pug',
  pugFolder:    './templates/',
  pugRootFile:  './index.pug'
};

const PLUGINS = [
  autoprefixer({ overrideBrowserslist: ['last 5 versions'], cascade: true }),
  mqpacker({ sort: sortCSSmq })
];

function compileScss() {
  return src(PATH.scssRootFile)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(PLUGINS))
    .pipe(csscomb())
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream()); // ✅ fixed
}

function compileScssDev() {
  const pluginsForDevMode = [...PLUGINS];
  pluginsForDevMode.splice(0, 1);
  return src(PATH.scssRootFile, { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(pluginsForDevMode))
    .pipe(dest(PATH.cssFolder, { sourcemaps: true }))
    .pipe(browserSync.stream()); // ✅ fixed
}

function compileScssMin() {
  const pluginsForMinify = [...PLUGINS, cssnano({ preset: 'default' })];
  return src(PATH.scssRootFile)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(pluginsForMinify))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(PATH.cssFolder));
}

function comb() {
  return src(PATH.scssAllFiles)
    .pipe(csscomb())
    .pipe(dest(PATH.scssFolder));
}

function compilePug() {
  return src(PATH.pugRootFile)
    .pipe(pug({ pretty: true }))
    .pipe(dest(PATH.htmlFolder));
}

function syncInit() {
  browserSync.init({ server: { baseDir: './' } });
}

async function sync() {
  browserSync.reload();
}

function watchFiles() {
  syncInit();
  watch(PATH.scssAllFiles, series(compileScss, compileScssMin));
  watch(PATH.htmlAllFiles, sync);
  watch(PATH.jsAllFiles, sync);
}

task('pug',   compilePug);
task('dev',   compileScssDev);
task('min',   compileScssMin);
task('scss',  series(compileScss, compileScssMin));
task('comb',  comb);
task('watch', watchFiles);