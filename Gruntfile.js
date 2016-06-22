module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/js/**/*js']
        },
        uglify: {
            dist: {
                files: {
                    'app/js/app.js': ['src/js/**/*js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    keepalive: true,
                }
            }
        },
        intern: {
            unit: {
                options: {
                    runType: 'client', // defaults to 'client'
                    config: 'tests/intern',
                    reporters: ['Console', 'Lcov'],
                    suites: ['tests/unit/all']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('intern');

    // Register a test task that uses Intern
    grunt.registerTask('test', ['intern']);
    grunt.registerTask('serve', ['connect']);

    grunt.registerTask('default', ['jshint', 'uglify']);
};
