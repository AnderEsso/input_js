//Підключаємо модулі галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();

//Порядок підключення css файлів
const cssFiles = [
   './src/css/style.css',
   './src/css/media.css'
]
//Порядок підключення js файлів
const jsFiles = [
   './src/js/main.js'
]

//Таск на стилі CSS
function styles() {
   //Шаблон для пошуку файлів CSS
   //Всі файлы по шаблону './src/css/**/*.css'
   return gulp.src(cssFiles)
      //Об'єднання файлів в один
      .pipe(concat('style.css'))
      //Добавити префикси
      .pipe(autoprefixer({
         browsersList: ['last 1 version'],
         cascade: false
      }))
      //Миніфікація CSS
      .pipe(cleanCSS({
         level: 2
      }))
      //Вихідна папка для стилів
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
}

//Таск на скріпти JS
function scripts() {
   //Шаблон для пошука файлів JS
   //Всі файли по шаблону './src/js/**/*.js'
   return gulp.src(jsFiles)
      //Об'єднання файлів в один
      .pipe(concat('script.js'))
      //Мініфікація JS
      .pipe(uglify({
         // toplevel: true
      }))
      //Вихідна папка для скриптів
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream());
}

//Видалити все у вказаній папці
function clean() {
   return del(['build/*'])
}

//Переглядати файли
function watch() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
   //Слідкувати за CSS файлами
   gulp.watch('./src/css/**/*.css', styles)
   //Слідкувати за JS файлами
   gulp.watch('./src/js/**/*.js', scripts)
   //При зміні HTML запустити синхронізацію
   gulp.watch("./*.html").on('change', browserSync.reload);
}

//Таск який визиває функцію styles
gulp.task('styles', styles);
//Таск який визиває функцію scripts
gulp.task('scripts', scripts);
//Таск для очистки папки build
gulp.task('del', clean);
//Таск для відслідковування змін
gulp.task('watch', watch);
//Таск для видалення файлів в папке build і запуск styles і scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
//Таск запускає таск build і watch почергово
gulp.task('dev', gulp.series('build', 'watch'));