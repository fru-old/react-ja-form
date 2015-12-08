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
	livereload = require('gulp-livereload');

var watch = {
	scripts: ['./scripts/**/*.tsx', './scripts/**/*.ts'],
	styles: './styles/**/*.scss'
};

	
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
});


// DEFAULT

gulp.task('default', ['script', 'sass', 'watch']);