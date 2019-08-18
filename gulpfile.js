const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
const imageminGiflossy = require('imagemin-giflossy');

const srcLocation = 'assets/images/*';
const dest = 'assets/dist';

gulp.task('default', () =>
  gulp
    .src(srcLocation)
    .pipe(
      imagemin(
        [
          imagemin.jpegtran({ progressive: true }),
          imagemin.svgo({
            plugins: [{ cleanupIDs: false, removeViewBox: false }]
          }),
          imageminPngquant({
            speed: 1,
            quality: [0.95, 1] //lossy settings
          }),
          imageminMozjpeg({
            quality: 85
          }),
          imageminZopfli({
            more: true
            // iterations: 50 // very slow but more effective
          }),
          imageminGiflossy({
            optimizationLevel: 3,
            //keep-empty: Preserve empty transparent frames
            lossy: 2
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest(dest))
);
