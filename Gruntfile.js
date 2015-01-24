'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  var appConfig = {
    adminTemp:'app/views/admin',
    adminCss:'public/css/admin'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    appadmin: appConfig,
    develop: {
      server: {
        file: 'app.js'
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.scss'
        }
      },
      server:{
        files:[{
          expand:true,
          cwd:'<%= appadmin.adminCss %>',
          src:['*.{sass,scss}'],
          dest:'<%= appadmin.adminCss %>',
          ext:'.css'
        }]
      }
    },
    // Automatically inject Bower components into the app
    /**
     * jade
     * //- 注释
     */
    wiredep: {
      admin: {
        src: ['<%= appadmin.adminTemp %>/*.jade',
        '<%= appadmin.adminTemp %>/*.html'
        ],
        ignorePath:  /(\.\.\/){3}public/
      },
      sass:{
        src:['<%= appadmin.adminCss %>/*.{scss,sass}']
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/css/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass:dist',
    'develop',
    'watch'
  ]);

  grunt.registerTask('serve','开启web服务',function () {
    grunt.task.run([
      'wiredep',
      'sass',
      'develop',
      'watch'
    ]);
  });
};
