'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt); 
  require('grunt-karma')(grunt);

  grunt.initConfig({
    truecar: {
      // configurable paths
      app: require('./bower.json').appPath || 'app/client',
      dist: 'app/client/dist'
    },
    browserify: {
      js: {
        src: {
          files: '<%= truecar.app %>/src/**/*.js'
        },
        dest: '<%= truecar.dist %>'
      }
    },
    sync: {
      dist: {
        files: [{
          cwd: '<%= truecar.app %>',
          dest: '<%= truecar.dist %>',
          src: '**'
        }]
      }
    },
    watch: {
      options: {
        livereload: 35729
      },
      src: {
        files: [
          '<%= truecar.app %>/*.html',
          '<%= truecar.app %>/css/**/*',
          '<%= truecar.app %>/src/**/*',
          '<%= truecar.app %>/views/**/*',
          'test/spec/**/*.js'
        ]
        ,tasks: ['karma']
        //tasks: ['sync:dist']
      }
    },
    connect: {
      proxies: [
        {
          // context: '/truecar',
          context: '/api/v1',
          host: 'localhost',
          port: 5000,
          https: false,
          changeOrigin: false
        }
      ],
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= truecar.app %>'
          ],
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static(require('path').resolve('app/client'))
            ];
          }
        }
      },
      /*
      dist: {
        options: {
          base: '<%= truecar.dist %>'
        }
      }
      */
    },

    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= truecar.app %>',
          dest: '<%= truecar.dist %>',
          src: '**'
        }]
      },
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js',
        singleRun: true
      }
    },
    bowercopy: {
      options: {
        destPrefix: '<%= truecar.app %>'
      },
      test: {
        files: {
          'test/lib/angular-mocks': 'angular-mocks',
          'test/lib/angular-scenario': 'angular-scenario'
        }
      }
    }
  });

  grunt.loadNPMTasks('grunt-browserify');
  grunt.loadNPMTasks('grunt-contrib-copy');

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'browserify',
      'copy:dist',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });
};
