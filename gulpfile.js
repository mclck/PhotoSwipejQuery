let CONFIG = require('./config/config.json'),
    GULP = require('gulp'),
    scss = require('gulp-sass'),
    bs = require('browser-sync'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    nano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    babel = require("gulp-babel"),
    browserify = require("gulp-browserify");

GULP
    /**
     * SASS
     */
    .task(CONFIG.SASS, () => {
        return GULP.src('src/scss//**/*.scss')
            //.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(plumber({
                errorHandler: (err) => {
                    notify.onError({
                        title: "Gulp 🍹 error in " + err.plugin,
                        message: err.toString()
                    })(err);
                }
            }))
            .pipe(scss())
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(nano({ zindex: false }))
            .pipe(rename({ suffix: CONFIG.PROJECT.SUFFIX }))
            .pipe(GULP.dest(`${CONFIG.PROJECT.BASE}/${CONFIG.PROJECT.CSS}`))
            .pipe(bs.reload({
                stream: true
            }));
    })
    /**
     * JavaScript
     */
    .task(CONFIG.JS, () => {
        return GULP.src([/*'src/js/handlebars.runtime.js', 'src/templates/tpl.js', 'src/libs/` jquery/dist/jquery.min.js', */`${CONFIG.PROJECT.SOURCE}/js/main.${CONFIG.PROJECT.JS}`])
            .pipe(concat(`${CONFIG.NAMES.JS}.${CONFIG.PROJECT.SUFFIX}.${CONFIG.PROJECT.JS}`))
            .pipe(browserify())
            .pipe(babel())
            //.pipe(uglify())
            .pipe(GULP.dest(`${CONFIG.PROJECT.BASE}/${CONFIG.PROJECT.JS}`))
            .pipe(bs.reload({
                stream: true
            }));
    })
    /**
     * HandleBars
     */
    .task('templates', () => {
        GULP.src('src/js/templates/*.html')
            .pipe(plumber({
                errorHandler: (err) => {
                    notify.onError({
                        title: "GULP error in " + err.plugin,
                        message: err.toString()
                    })(err);
                }
            }))
            .pipe(handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: 'tpl',
                noRedeclare: true
            }))
            .pipe(concat('templates/tpl.js'))
            .pipe(GULP.dest('src'));
    })
    .task('copy-js', () => {
        return GULP.src('node_modules/handlebars/dist/handlebars.runtime.js')
            .pipe(GULP.dest(`${CONFIG.PROJECT.BASE}/${CONFIG.PROJECT.JS}`));
    })
    /**
     * BrowserSync
     */
    .task(CONFIG.BROWSER_SYNC, () => {
        bs({
            server: {
                baseDir: `${CONFIG.PROJECT.BASE}`
            },
            notify: false
        });
    })
    .task(CONFIG.ICONS, () => {
        return GULP.src('src/libs/font-awesome/fonts/**.*')
            .pipe(GULP.dest('src/fonts'));
    })
    .task(CONFIG.WATCHER, [CONFIG.BROWSER_SYNC, CONFIG.SASS, CONFIG.JS], () => {
        GULP.watch('src/scss/**/*.scss', [CONFIG.SASS]);
        GULP.watch('src/js//**/*.js', [CONFIG.JS]);
        GULP.watch('app/*.html', bs.reload);
    });