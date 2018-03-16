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
var util         = require('gulp-util');
var stripDebug   = require('gulp-strip-debug');
var path = null;

/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
*/

var config = {
    production: !!util.env.production,
    wordpress: !!util.env.wordpress
};


if(config.wordpress) {
    path = './wordpress/wp-content/themes/NOMDUTHEME/medias/';
    //config.production = true;
} else {
    path = './integration/_html/medias/'
}


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

    // Components
    gulp.src([
        path + '/components/scripts/**/*.js',
        '!' + path + '/components/scripts/min/components.min.js',
        '!' + path + '/components/scripts/components.extended.js'
    ])
    .pipe(include()).on('error', console.log)
    .pipe(config.production ? stripDebug() : util.noop())
    .pipe(!config.production ? sourcemaps.init() : util.noop())
    .pipe(concat('components.extended.js'))
    .pipe(gulp.dest(path + '/components/scripts/'))
    .pipe(concat('components.min.js'))
    .pipe(uglify().on('error', swallowError))
    .pipe(!config.production ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(path + '/components/scripts/min/'));

    // Pages
    gulp.src([
        path + '/pages/scripts/**/*.js',
        '!' + path + '/pages/scripts/min/**/*.js'
    ])
    .pipe(include()).on('error', console.log)
    .pipe(config.production ? stripDebug() : util.noop())
    .pipe(!config.production ? sourcemaps.init() : util.noop())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify().on('error', swallowError))
    .pipe(!config.production ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(path + '/pages/scripts/min/'));
});

/**
 * Compress CSS
 */
gulp.task('compress-css', function()
{
    // Components
    gulp.src([path + '/components/styles/scss/**/!(_)*.scss'])
    .pipe(!config.production ? sourcemaps.init() : util.noop())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 6 versions'))
    .pipe(concat('components.min.css'))
    .pipe(!config.production ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(path + '/components/styles/css/'));

    // Pages
    gulp.src([path + '/pages/styles/scss/**/!(_)*.scss'])
    .pipe(!config.production ? sourcemaps.init() : util.noop())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 6 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(!config.production ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(path + '/pages/styles/css/'));
});

/**
 * Lint
 */
gulp.task('hint', function()
{
    paths.forEach(function(path)
    {
        gulp.src([
            path + '/**/scripts/**/*.js',
            '!' + path + '/pages/scripts/min/**/*.js',
            '!' + path + '/components/scripts/min/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });
});

/**
 * Watch
 */
gulp.task('watch', function ()
{
    // JS
    gulp.watch([
            path + '/components/scripts/**/*.js',
            path + '/pages/scripts/**/*.js',
            '!' + path + '/components/scripts/min/**/*.js',
            '!' + path + '/components/scripts/components.extended.js',
            '!' + path + '/pages/scripts/min/**/*.js',
        ],
        ['compress-js']
    );

    // CSS
    gulp.watch([
            path + '/components/styles/scss/**/*.scss',
            path + '/pages/styles/scss/**/*.scss'
        ],
        ['compress-css']
    );
});

/**
 * SVG Srite
 */
gulp.task('sprite', function ()
{
    var pathIcons = path + '/components/';
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
