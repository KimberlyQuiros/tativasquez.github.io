module.exports = function(grunt) {

    grunt.initConfig({
        browserSync: {
            dev: {
                bsFiles: { src : ['css/*.css', '*.html', 'js/script.js'] },
                options: {
                    server: {
                        baseDir: './'
                    },
                    watchTask: true
                }
            }
        }, /* browserSync */

        sass: {
            options: {
                sourceMap: true,
                style: 'compressed'
            },
            dist: {
                files: {
                    'css/style.min.css' : 'components/sass/style.scss'
                }
            }
        }, /* sass */

        uglify: {
            dist: {
                files: { 
                    'js/script.min.js': ['components/js/script.js'],
                    'js/plugins.min.js': [
                        'components/plugins/js/jquery.easing.min.js',
                        'components/plugins/js/scrolling-nav.js',
                        'components/plugins/js/jquery.matchHeight.js',
                        'components/plugins/js/jquery.scrollstop.min.js',
                        'components/plugins/js/jquery.lazyload.min.js',
                        'components/plugins/js/bootstrap.min.js'
                    ]
                }
            }
        }, /* uglify */


        // imagemin: {
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: 'components/img/',
        //             src: ['**/*.{png,jpg,gif}'],
        //             dest: 'img/'
        //         }]
        //     }
        // }, /* imagemin */


        /*======== watch ========*/
        watch: {
            css: {
                files: 'components/**/*.scss',
                tasks: ['sass']
            }, /* css */

            js: {
                files: 'components/js/*.js',
                tasks: ['uglify']
            }, /* js */

            pluginsJs: {
                files: 'components/plugins/js/*.js',
                tasks: ['uglify']
            }

            /*images: {
                files: ['components/img/*.{png,jpg}'],
                tasks: ['newer:imagemin'],
                options: {
                    spawn: false,
                }
            }   images-watch */
        } /* watch */
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('dev', ['sass', 'uglify', 'browserSync', 'watch']);
}
