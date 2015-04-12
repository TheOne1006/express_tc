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
    homeCss:'public/css/home',
    pubImg:'public/img',
    pubSvg:'public/svg',
    expressApp:'app',
    expressConfig:'config',
    angularApp:'angular',
    dist:'dist'
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
        src: ['<%= appCon.adminTemp %>/*.jade'],
        exclude:[
        'public/components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        'public//components/headroom.js/dist/headroom.js',
        'public/components/headroom.js/dist/jQuery.headroom.js',
        'public/components/headroom.js/dist/angular.headroom.js',
        'public/components/tinymce/tinymce.min.js'
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
        'public/components/angular-carousel/dist/angular-carousel.css',
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
    },
    // 清除clean
    clean:{
      dist: {
        files:[{
          dot: true,
          src: [
            '<%= appCon.dist %>/{,*/}*',
            '!<%= appCon.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= appCon.dist %>/public/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/svg',
          src: '{,*/}*.svg',
          dest: '<%= appCon.dist %>/public/svg'
        }]
      }
    },
    // Copies remaining files to places other tasks can use 复制项目
    copy: {
      //express app
      expressdist: {
        files: [
        {
          expand: true,
          dot: true,
          cwd: '<%= appCon.expressApp %>',
          dest: '<%= appCon.dist %>/<%= appCon.expressApp %>',
          src: [
            '{,*/**/}*.{js,jade}'
          ]
        }, {
          expand: true,
          cwd: '.',
          src: ['package.json', 'app.js'],
          dest: '<%= appCon.dist %>'
        },{
          expand: true,
          cwd:'<%= appCon.expressConfig %>',
          dest:'<%= appCon.dist %>/<%= appCon.expressConfig %>',
          src: [
            '*.js'
          ]
        }]
      },
      angulardist: {
        files: [{
          expand: true,
          cwd:'<%= appCon.angularApp %>',
          dest: '<%= appCon.dist %>/<%= appCon.angularApp %>',
          src:[
            // 'scripts/{,*/**/}*.js',
            'views/{,*/**/}*.html'
          ]
        }]
      },
      styles: {
        files:[
        // {
        //   expand: true,
        //   cwd: '<%= appCon.homeCss %>',
        //   dest: '<%= appCon.dist %>/<%= appCon.homeCss %>',
        //   src: '*.css'
        // }, 
        // {
        //   expand: true,
        //   cwd: '<%= appCon.adminCss %>',
        //   dest: '<%= appCon.dist %>/<%= appCon.adminCss %>',
        //   src: '*.css'
        // }, 
        {
          expand: true,
          cwd: '.',
          src: 'public/components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= appCon.dist %>'
        }]
      },
      tinymce: {
        files:[
        {
          expand: true,
          cwd: 'public/components/tinymce',
          src: '{,*/**/}*.*',
          dest: '<%= appCon.dist %>/public/tinymce'
        }]
      },
      mynodeModules: {
        files:[
        {
          expand: true,
          cwd: '.',
          src:'my_node_modules/**/*.*',
          dest:'<%= appCon.dist %>'
        }
        ]
      }
    },
    
    // concat:{
    //   options:{
    //     separator:';'
    //   },
    //   dist:{
    //     src:['public/js/admin/extend/faceapp-sdk.js','public/js/admin/extend/webcam.js'],
    //     dest:'dist/public/tt.js'
    //   }
    // },
    // js 地图
    uglify:{
      options: {
        sourceMap:false,
      }
    },
    // Performs rewrites based on filerev and the useminPrepare configuration
    jadeUsemin: {
      options: {
        dirTasks: 'filerev',
        replacePath: {       //替换
            '#{env}': ''
        },
        targetPrefix: '<%= appCon.dist %>',
        tasks: {
            js: ['concat', 'uglify', 'filerev'],
            css: ['concat', 'cssmin', 'autoprefixer', 'filerev']
        }
      },
      home: {
          files: [{
              dest: '<%= appCon.dist%>/<%= appCon.homeTemp %>/layout.jade',
              src: '<%= appCon.homeTemp %>/layout.jade',
          }]
      },
      admin: {
        files: [{
            dest: '<%= appCon.dist%>/<%= appCon.adminTemp %>/layout.jade',
            src: '<%= appCon.adminTemp %>/layout.jade',
        }]
      }
    },

    // 并行任务
    concurrent: {
      dist: [
        'sass',
        'imagemin',
        'svgmin'
      ]
    },
    // md5 文件
    filerev: {
      dist: {
        files: {
          src: [
            '<%= appCon.dist %>/public/css/{,*/}*.css',
            '<%= appCon.dist %>/script/home/*.js'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes:true,
          removeEmptyAttributes:true, // 删除空
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= appCon.dist %>',
          src: ['*.html', 'angular/views/{,*/**/}*.html'],
          dest: '<%= appCon.dist %>'
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

// grunt-usemin (userminPrepare, usemin)
  grunt.registerTask('build', '项目生成',[
    'clean:dist',
    'wiredep',
    'concurrent:dist',
    'autoprefixer',
    'copy',
    'jadeUsemin',
    'htmlmin'
  ]);

};
