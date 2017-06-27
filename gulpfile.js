'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sync = require('browser-sync');

var path = {
    src: { 
        html: 'dev/*.html',
         pug: 'app/pug/*.pug',
        css: 'dev/css/'
    },
    watch: {
        pug: 'dev/pug/**/*.pug',
        scss: 'dev/scss/**/*.scss'        
    },
    basedir: 'dev/'
}; 

gulp.task('sass', function() {
    gulp.src(path.watch.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.css))
});



gulp.task('sync:server', function() {
    sync({
        server: {
            baseDir: path.basedir            
        },
        port: 8080,
        open: true,
        notify: false
    });
});


gulp.task('sync:pug', function() {
    return gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        })
        .on('error', function(error) {
            console.log(error);
            this.end();
           })
        )      
        .pipe(gulp.dest(path.basedir))
        .pipe(sync.reload({
            stream: true
        }));
});


gulp.task('sync:html', function() {
    return gulp.src(path.watch.html)
        .pipe(sync.reload({
            stream: true
        }));    
});

gulp.task('sync:sass', function() {
    return gulp.src(path.watch.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.css))
        .pipe(sync.reload({
            stream: true
        }));
});
gulp.task('watch',['sync:server','sync:pug', 'sync:html', 'sync:sass'], function() {
    gulp.watch(path.watch.pug, ['sync:pug']);
    gulp.watch(path.watch.scss, ['sync:sass']); 
    gulp.watch(path.watch.html, ['sync:html']); 
});