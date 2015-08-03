'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('grunt-karma')(grunt);

  grunt.initConfig({
    truecar: {
      // configurable paths
      app: require('./bower.json').appPath || 'app/client/src/',
      /**
       * The directory to which we throw our compiled project files.
       */
      dist: 'app/client/dist',
      /**
       * We read in our `package.json` file so we can access the package name and
       * version. It's already there, so we don't repeat ourselves here.
       */
      pkg: grunt.file.readJSON('package.json'),
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
      optiotruecar: {
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
      optiotruecar: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        optiotruecar: {
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
        optiotruecar: {
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
      optiotruecar: {
        destPrefix: '<%= truecar.app %>'
      },
      test: {
        files: {
          'test/lib/angular-mocks': 'angular-mocks',
          'test/lib/angular-scenario': 'angular-scenario'
        }
      }
    },
    /**
     * The directory to delete when `grunt clean` is executed.
     */
    clean: [ '<%= truecar.dist %>' ],
    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `dist` target is the concatenation of our application source code
       * into a single file. All files matching what's in the `src.js`
       * configuration property above will be included in the final build.
       *
       * In addition, the source is surrounded in the blocks specified in the
       * `module.prefix` and `module.suffix` files, which are just run blocks
       * to etruecarure nothing pollutes the global scope.
       *
       * The `optiotruecar` array allows us to specify some customization for this
       * operation. In this case, we are adding a banner to the top of the file,
       * based on the above definition of `meta.banner`. This is simply a
       * comment with copyright informaiton.
       */
      dist: {
        optiotruecar: {},
        src: [
            '<%= truecar.app %>/src/**/*.js'
        ],
          // 'module.prefix', '<%= truecar.app %>/src/*.js', 'module.suffix'
        dest: '<%= truecar.dist %>/assets/truecar.js'
      }

    },
    /**
     * Use ng-min to annotate the sources before minifying
     */
    ngmin: {
      dist: {
        src: [ '<%= truecar.dist %>/assets/truecar.js' ],
        dest: '<%= truecar.dist %>/assets/truecar.annotated.js'
      }
    },

    /**
     * Minify the sources!
     */
    uglify: {
      optiotruecar: {
      },
      dist: {
        files: {
          '<%= truecar.dist %>/assets/truecar.min.js': [
            '<%= truecar.dist %>/assets/truecar.annotated.js'
          ]
        }
      }
    }


  });

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      //'copy:dist',
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('dist', function (target) {
    grunt.task.run([
      'clean',
      'concat',
      'ngmin',
      'uglify'
    ]);
  });
};
