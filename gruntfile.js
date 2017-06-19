module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');

    // Project configuration.
    grunt.initConfig({
        connect: {
            localhost: {
                options: {
                    port: 15000,
                    keepalive: true
                }
            }
        }
    });

};