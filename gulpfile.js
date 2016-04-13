'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');



gulp.task('css', function () {
	gulp.src('./css/*.css')
		.pipe(concat('vendor.css'))
		.pipe(minifyCss())
		.pipe(rev())
		.pipe(gulp.dest('./build'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev'));
});

gulp.task('uglify', function () {
	gulp.src('./lib/*.js')
		.pipe(concat('lib.js'))
		.pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
		.pipe(rev())
		.pipe(gulp.dest('./build'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev'));
});
gulp.task('main', function () {
	gulp.src('./js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
		.pipe(rev())
		.pipe(gulp.dest('./build'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev'));
});

gulp.task('rev', function () {
	gulp.src(['./rev/*.json', './index.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./build'))
});

gulp.task('clean', function(){
     gulp.src(['./application/vendor.css', './application/lib.js'])
	     .pipe(clean())	
})

gulp.task('default', ['clean', 'css', 'uglify', 'rev'])