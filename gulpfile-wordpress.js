/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var jshint       = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var watch        = require('gulp-watch');
var svgSprite    = require('gulp-svg-sprite');
var sourcemaps   = require('gulp-sourcemaps');
var include      = require("gulp-include");
var minimist     = require('minimist');
var gulpif       = require('gulp-if');
var stripDebug   = require('gulp-strip-debug');

/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
*/

var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'production'
    }
};


var config = {
    production : minimist(process.argv.slice(2), knownOptions),
    path       : './wp-content/themes/NOMDUTHEMEWORDPRESS/'
};


function swallowError(error) {
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
};

/*
|--------------------------------------------------------------------------
| TASKS
|--------------------------------------------------------------------------
*/

/**
 * Compress JS
 */
gulp.task('compress-js', function()
{
    console.log('path = ', path, config.production);

    var path = config.path;

    // Components
    gulp.src([
        path + '/medias/components/scripts/**/*.js',
        '!' + path + '/medias/components/scripts/min/components.min.js',
        '!' + path + '/medias/components/scripts/components.extended.js'
    ])
    .pipe(include()).on('error', console.log)
    .pipe(gulpif(config.production.env === 'production', stripDebug()))
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.init()))
    .pipe(concat('components.extended.js'))
    .pipe(gulp.dest(path + '/components/scripts/'))
    .pipe(concat('components.min.js'))
    .pipe(uglify().on('error', swallowError))
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/components/scripts/min/'));

    // Pages
    gulp.src([
        path + '/medias/pages/scripts/**/*.js',
        '!' + path + '/medias/pages/scripts/min/**/*.js'
    ])
    .pipe(include()).on('error', console.log)
    .pipe(gulpif(config.production.env === 'production', stripDebug()))
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.init()))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify().on('error', swallowError))
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/pages/scripts/min/'));
});

/**
 * Compress CSS
 */
gulp.task('compress-css', function()
{
    var path = config.path;

    // Components
    //gulp.src([path + '/components/styles/scss/**/!(_)*.scss'])
    gulp.src([path + '/style.scss'])
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 6 versions'))
    .pipe(concat('style.css'))
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.write()))
    .pipe(gulp.dest(path));

    // Pages
    gulp.src([path + '/medias/pages/styles/scss/**/!(_)*.scss'])
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 6 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(config.production.env !== 'production', sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/pages/styles/css/'));
});

/**
 * Lint
 */
gulp.task('hint', function()
{
    var path = config.path;
    gulp.src([
        path + '/medias/**/scripts/**/*.js',
        '!' + path + '/medias/pages/scripts/min/**/*.js',
        '!' + path + '/medias/components/scripts/min/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * Watch
 */
gulp.task('watch', function ()
{
    var path = config.path;

    // JS
    gulp.watch([
            path + '/medias/components/scripts/**/*.js',
            path + '/medias/pages/scripts/**/*.js',
            '!' + path + '/medias/components/scripts/min/**/*.js',
            '!' + path + '/medias/components/scripts/components.extended.js',
            '!' + path + '/medias/pages/scripts/min/**/*.js',
        ],
        ['compress-js']
    );

    // CSS
    gulp.watch([
            path + 'style.scss',
            path + '/medias/pages/styles/scss/**/*.scss'
        ],
        ['compress-css']
    );
});

/**
 * SVG Srite
 */
gulp.task('sprite', function ()
{
    var pathIcons = config.path + '/medias/components/';
    var svgConfig = {
        svg: {
            namespaceClassnames: false
        },
        mode: {
            symbol: {
                dest: '.',
                sprite: 'sprite.svg'
            }
        }
    };

    gulp.src(pathIcons + '/images/icons/single/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(pathIcons + '/images/icons/'));
});

// Launch all
gulp.task('default', ['compress-js', 'compress-css'], function(){});
