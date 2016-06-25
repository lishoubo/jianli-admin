module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: ['admin.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {
                // 将要被合并的文件
                src: ['src/app/**/*.js'],
                // 合并后的JS文件的存放位置
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['src/app/**/*.js'],
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        copy: {
            files: {
                expand: true,
                cwd: 'src',
                src: ['pages/**/*', 'images/*'],
                dest: 'dist/'
            }
        },
        watch: {
            pages: {
                files: ['src/app/**/*.js', 'src/css/**/*.js', 'src/pages/**/*.html', 'src/images/**/*'],
                tasks: ['jshint', 'cssmin', 'concat', 'uglify', 'copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 默认任务
    grunt.registerTask('default', ['jshint', 'cssmin', 'concat', 'uglify', 'copy', 'watch:pages']);

};