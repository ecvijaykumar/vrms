var gulp = require('gulp'),
browserify = require('gulp-browserify'),
minifyCSS = require('gulp-minify-css'),
uglify = require('gulp-uglify'),
reactify = require('reactify'),
rimraf = require('gulp-rimraf'),
sass = require('gulp-ruby-sass'),
rename = require('gulp-rename'),
concat = require('gulp-concat');


gulp.task('styles', function() {
    gulp.src('src/scss/styles.scss')
	.pipe(sass())
	.on('error', function(err) {
	    console.log(err.message);
	})
	.pipe(gulp.dest('src/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./public/dist/css'));
});

gulp.task('clean', function() {
    gulp.src(['dist/js/app*/', 'src/css/*'])
    .pipe(rimraf());
});

gulp.task('scripts', function() {
    gulp.src('./src/js/app.jsx', { read: false})
	.pipe(browserify({
	    insertGlobals: false,
	    debug: true,
	    transform: ['reactify'],
	    extensions: ['.jsx'] 
	}))
	// .pipe(uglify({
	//     mangle: {
	// 	except: ['require'] //Dont touch the require folder
	//     }
	// }))
	.pipe(rename({extname: '.min.js'}))
	.pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('static', function() {
    gulp.src('src/scss/semantic-ui/fonts/icons.*')
	.pipe(gulp.dest('./public/dist/fonts'));
    gulp.src('static/images/*')
	.pipe(gulp.dest('./public/dist/css/images')); 
    gulp.src('bower_components/jquery/dist/jquery.min.*')
	.pipe(gulp.dest('./public/dist/js/'));
    gulp.src('bower_components/trumbowyg/dist/trumbowyg.min.js')
	.pipe(gulp.dest('./public/dist/js/'));
    gulp.src('bower_components/trumbowyg/dist/ui/trumbowyg.min.css')
	.pipe(gulp.dest('./public/dist/css/'));

    gulp.src('src/scss/semantic-ui/**/*.js')
	.pipe(concat('sui.js'))
//	.pipe(uglify())
	.pipe(rename({extname: '.min.js'}))
	.pipe(gulp.dest('./public/dist/js/'));
});

var paths = {
  scripts: ['./src/js/app.jsx', './src/js/comp/**/*.jsx', './src/js/**/*.js'],
  styles: './src/scss/*.scss'
};
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch','scripts', 'styles', 'static']);


