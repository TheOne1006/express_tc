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
    adminCss:'public/css/admin',
    homeTemp:'app/views/home',
    homeCss:'public/css/home'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    appCon: appConfig,
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
      homedist:{
        files:{
          'public/css/home/bootstrap-theone-blog.css': 'public/css/home/bootstrap-theone-blog.scss'
        }
      },
      server:{
        files:[{
          expand:true,
          cwd:'<%= appCon.adminCss %>',
          src:['*.{sass,scss}'],
          dest:'<%= appCon.adminCss %>',
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
        src: ['<%= appCon.adminTemp %>/*.jade',
        '<%= appCon.adminTemp %>/*.html'
        ],
        ignorePath:  /(\.\.\/){3}public/
      },
      home :{
        src:['<%= appCon.homeTemp %>/*.jade'],
        // 忽略 js 文件
        exclude:['public/components/json3/lib/json3.js',
        'public/components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        'public/components/ng-tags-input/ng-tags-input.min.css',
        'public/components/ng-grid/build/ng-grid.js', 
        'public/components/tinymce/tinymce.min.js',
        'public/components/angular-ui-tinymce/src/tinymce.js',
        'public/components/ng-tags-input/ng-tags-input.min.js',
        'public/components/angular-route/angular-route.js',
        'public/components/ng-grid/ng-grid.css',
        // 多余的 headroom
        'public/components/headroom.js/dist/jQuery.headroom.js',
        'public/components/headroom.js/dist/angular.headroom.js'
        ],
        ignorePath:  /(\.\.\/){3}public/
      },
      sass:{
        src:['<%= appCon.adminCss %>/*.{scss,sass}']
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
      scss: {
        files: [
          'public/css/*.scss',
          'public/css/admin/*.scss',
          'public/css/home/*.scss'
        ],
        tasks: ['watchsass'],
        options: {
          livereload: reloadPort
        }
      },
      css:{
        files: [
          'public/css/home/*.css'
        ],
        tasks: ['autoprefixer'],
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
      },
      angular:{
        files:[
          'angular/scripts/**/**/*.js',
          'angular/scripts/**/*.js',
          'angular/scripts/*.js',
        ],
        options: { livereload: reloadPort }
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      openbrwoer: {
        options: {
          open: true,
          middleware: [
          function myMiddleware(req, res) {
              res.writeHead(200);
              // 定时器 跳转
              res.write('<script> setTimeout(function(){location="http://localhost:3000"},3000);</script>');
              res.end();
          }
        ],
        }
      }
    },

    // Add vendor prefixed styles 自动添加css3 前缀
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appCon.homeCss %>',
          src: '{,*/}*.css',
          dest: '<%= appCon.homeCss %>'
        }]
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

  grunt.registerTask('watchsass','编译scss添加前缀',function () {
    grunt.task.run([
      'sass',
      'autoprefixer'
      ]);
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
      'autoprefixer',
      'connect:openbrwoer',
      'watch'
    ]);
  });
};
