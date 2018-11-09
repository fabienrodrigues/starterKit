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
var svgSprite    = require('gulp-svg-sprite');
var sourcemaps   = require('gulp-sourcemaps');
var include      = require("gulp-include");
var minimist     = require('minimist');
var gulpif       = require('gulp-if');
var stripDebug   = require('gulp-strip-debug');
var favicons     = require("favicons").stream;
var env          = require('gulp-environment');
var path = null;

/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
*/


var path = './_html/';


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
    console.log('path = ', path);

    // Components
    gulp.src(path + '/medias/components/scripts/main.js')
    .pipe(include()).on('error', console.log)
    .pipe(env.if.production(stripDebug()).else(sourcemaps.init()))
    .pipe(uglify({output : {comments: 'some'}, compress: { hoist_funs: false }}).on('error', swallowError))
    .pipe(env.if.not.production(sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/components/scripts/min/'));

    // Pages
    gulp.src([
        path + '/medias/pages/scripts/**/*.js',
        '!' + path + '/medias/pages/scripts/min/**/*.js',
    ])
    .pipe(include()).on('error', console.log)
    .pipe(env.if.production(stripDebug()).else(sourcemaps.init()))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({output : {comments: 'some'}, compress: { hoist_funs: false }}).on('error', swallowError))
    .pipe(env.if.not.production(sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/pages/scripts/min/'));
});


/**
 * Compress CSS
 */
gulp.task('compress-css', function()
{
    // Components
    gulp.src([path + '/medias/components/styles/scss/styles.scss'])
    .pipe(env.if.not.production(sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 6 versions'))
    .pipe(env.if.not.production(sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/components/styles/css/'));

    // Pages
    gulp.src([path + '/medias/pages/styles/scss/**/!(_)*.scss'])
    .pipe(env.if.not.production(sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 6 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(env.if.not.production(sourcemaps.write()))
    .pipe(gulp.dest(path + '/medias/pages/styles/css/'));
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
 * gulp watch --env=development // for dev
 * gulp watch // for prod
 */
gulp.task('watch', function ()
{
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
            path + '/medias/components/styles/scss/**/*.scss',
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
    var pathIcons = path + '/medias/components/';
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


/**
 * GENERATE FAVICONS
 */
gulp.task("favicons", function () {
    return gulp.src("./favicon.png").pipe(favicons({
        path: path + 'medias/components/images/favicons', // path to favicons in html
        pipeHTML: true,
        html: 'favicons.html',
        icons: {
            android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            yandex: false                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        }
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(path + "/medias/components/images/favicons"));
});

// Launch all
gulp.task('default', ['compress-js', 'compress-css'], function(){});
