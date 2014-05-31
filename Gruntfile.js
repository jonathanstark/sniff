module.exports = function (grunt) {

    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jslint: {

            client: {
                src: ['sniff.js'],
                directives: {
                    nomen: true,
                    globals: {
                        'document': true,
                        'define': true,
                        'module': true,
                        'require': true,
                        'window': true
                    }
                }
            }

        },

        uglify: {

            my_target: {
                options: {
                    mangle: true,
                    report: 'gzip',
                    banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("isoDateTime") %>\n * https://github.com/jonathanstark/sniff.js\n * \n * Copyright (c) <%= grunt.template.today("yyyy") %> Jonathan Stark\n * Released under the MIT license.\n */\n'
                },
                files: {
                    'sniff.min.js': ['sniff.js']
                }
            }

        },

        jasmine: {
            test: {
                src: 'sniff.min.js',
                options: {
                    specs: 'tests/*.js',
                    vendor: [
                        'http://cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js'
                    ]
                }
            }
        },

        watch: {

            default: {
                files: ['sniff.js'],
                tasks: ['jslint', 'uglify']
            }

        }

    });

    grunt.registerTask('default', [ 'jslint', 'uglify' ]);
    grunt.registerTask('test', [ 'jasmine' ]);

};
