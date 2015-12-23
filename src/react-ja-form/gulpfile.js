/// <binding ProjectOpened='watch' />

// TODO TESTING 
// "gulp-jasmine": "^2.2.1",
// "gulp-browserstack": "^1.0.2",
// http://stackoverflow.com/questions/25537919/running-protractor-tests-on-browserstack-automate


var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
	browserify = require('gulp-browserify'),
	sass = require('gulp-sass'),
    concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify');

var watch = {
	scripts: ['./scripts/**/*.tsx', './scripts/**/*.ts'],
	styles: './styles/**/*.scss',
	html: './wwwroot/examples/**/*.html',
};

var scriptRequirements = [
    './node_modules/react/dist/react-with-addons.min.js',
    './node_modules/react-dom/dist/react-dom.min.js',
    './node_modules/react-select/node_modules/react-input-autosize/dist/react-input-autosize.min.js',
    './node_modules/react-select/node_modules/classnames/index.js',
    './node_modules/react-select/dist/react-select.min.js',
    './node_modules/react-maskedinput/dist/react-maskedinput.min.js'
];

var styleRequirements = [
    './node_modules/react-select/dist/react-select.css'
];


// BUNDLE REQUIREMENTS

gulp.task('script-requirements', function () {
    return gulp.src(scriptRequirements)
      .pipe(concat('react-ja-form-requirements.js'))
      .pipe(gulp.dest('./wwwroot/scripts'));
});

gulp.task('style-requirements', function () {
    return gulp.src(styleRequirements)
      .pipe(concat('react-ja-form-requirements.css'))
      .pipe(gulp.dest('./wwwroot/styles'));
});


// TYPESCRIPT
	
var cache = typescript.createProject({
	noExternalResolve: true,
	sortOutput: true, // Needed for source maps
	jsx: 'react',
	module: 'commonjs'
});

gulp.task('script-typescript', function () {
    return gulp.src(watch.scripts)
		.pipe(sourcemaps.init())
		.pipe(typescript(cache)).js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./wwwroot/scripts/'))
		.pipe(livereload());
});

gulp.task('script', ['script-typescript'], function () {
    return gulp.src('./wwwroot/scripts/react-ja-form.js')
        .pipe(browserify())
        .pipe(gulp.dest('./wwwroot'))
        .pipe(livereload());
});


// SASS

gulp.task('sass', function () {
    return gulp.src(watch.styles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./wwwroot/styles'))
        .pipe(concat('react-ja-form.css'))
        .pipe(gulp.dest('./wwwroot'))
		.pipe(livereload());
});


// LIVE RELOAD

gulp.task('watch', function () {
    livereload.listen({ start: true, port: 34834 });
    gulp.watch(watch.styles, ['sass']);
    gulp.watch(watch.scripts, ['script']);
    gulp.watch(watch.html, ['html-reload']);
});

gulp.task('html-reload', function () {
    gulp.src(watch.html).pipe(livereload());
});


// DEFAULT

gulp.task('default', ['script', 'sass', 'style-requirements', 'script-requirements', 'watch']);

