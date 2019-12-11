'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import fse from 'fs-extra';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import bourbon from 'bourbon';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import notifier from 'node-notifier';
import sourcemaps from 'gulp-sourcemaps';

import webpackConfig from './webpack.config.babel';

const statsLog = {
	colors: true,
	version: false,
	hash: false,
	timings: false,
	chunks: false
};

export const cleanPaths = (done) => {
	fse.emptyDir('markup/scripts/css');
	fse.emptyDir('markup/scripts/js');
	fse.emptyDir('scripts/css');
	fse.emptyDir('scripts/js');
	done();
}

export function styles() {
	return gulp.src('source/sass/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: [bourbon.includePaths]
	}))
	.on('error', error => {
		const errorMessage = `Path: ${error.relativePath} at line ${error.line}`;

		notifier.notify({
			title: 'Error: Styles',
			message: errorMessage
		});

		gutil.log(gutil.colors.red('[Styles]'), gutil.colors.bgRed(errorMessage));
	})
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS({
		level: {
			1: {
				specialComments: 0
			}
		}
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('markup/scripts/css'))
	.pipe(gulp.dest('scripts/css'));
}

export function scripts(done) {
	webpack(webpackConfig, onComplete);

	function onComplete(error, stats) {
		if (error) {
			onError(error);
		} else if (stats.hasErrors()) {
			onError(stats.toString(statsLog));
		} else {
			onSuccess(stats.toString(statsLog));
		}
	}

	function onError(error) {
		notifier.notify({
			title: 'Error: Scripts',
			message: 'See terminal for more'
		});

		gutil.log(gutil.colors.red('[Scripts]'), '\n' + error);
		done();
	}

	function onSuccess() {
		fse.copy('scripts/js', 'markup/scripts/js');
		done();
	}
}

export function browser() {
	browserSync.init([
		'markup/**/*.html',
		'markup/**/*.php',
		'markup/**/*.css',
		'markup/**/*.js',
		'markup/themes/images/**/*',
		'scripts/css/**/*.css',
		'scripts/js/**/*.js',
		'themes/**/*.html',
		'themes/**/*.php',
		'themes/images/**/*'
	], {
		logPrefix: '',
		proxy: 'localhost',
		notify: false,
		open: false,
		port: 3000
	});
}

export function watch() {
	gulp.watch(['source/sass/**/*.scss', 'source/sass/**/*.css'], styles);
	gulp.watch('source/scripts/**/*.js', scripts);
}

const start = gulp.series(cleanPaths, gulp.parallel(browser, styles, scripts, watch));
export default start;
