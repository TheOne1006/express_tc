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
    clientAdminTemp: 'angular/views/admin',
    clientAdminLoginTemp: 'angular/views/admin/login',
    clientHomeTemp: 'angular/views/home',
    adminExtendJs:'public/js/admin/extend',
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
    wiredep: {
      admin: {
        src: ['<%= appCon.clientAdminTemp %>/*.html'],
        exclude:[
        'public/components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        'public/components/angular-strap/dist/angular-strap.js',
        'public/components/angular-strap/dist/angular-strap.tpl.js',
        'public/components/google-code-prettify/bin/prettify.min.js',
        'public/components/angular-carousel/dist/angular-carousel.js',
        'public/components/tinymce/tinymce.min.js',
        'public/components/vivus/dist/vivus.js',
        'public/components/mermaid/dist/mermaid.slim.js',
        'public/components/angular-mermaid/dist/angular-mermaid.js'
        ],
        ignorePath:  /(\.\.\/){3}public/
      },
      adminlogin: {
        src: ['<%= appCon.clientAdminLoginTemp %>/*.html'],
        exclude:[
        'public/components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        'public/components/angular-strap/dist/angular-strap.js',
        'public/components/angular-strap/dist/angular-strap.tpl.js',
        'public/components/google-code-prettify/bin/prettify.min.js',
        'public/components/angular-carousel/dist/angular-carousel.js',
        'public/components/tinymce/tinymce.min.js',
        'public/components/vivus/dist/vivus.js',
        'public/components/mermaid/dist/mermaid.slim.js',
        'public/components/angular-mermaid/dist/angular-mermaid.js',
        'public/components/ng-tags-input/ng-tags-input.min.js',
        'public/components/ng-grid/build/ng-grid.js',
        'public/components/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/components/tinymce-dist/tinymce.js',
        'public/components/angular-ui-tinymce/src/tinymce.js',
        'public/components/ng-tags-input/ng-tags-input.min.js'
        ],
        ignorePath:  /(\.\.\/){4}public/
      },
      home :{
        src:['<%= appCon.clientHomeTemp %>/index.html'],
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
        'public/components/angular-file-upload/angular-file-upload.js',
        'public/components/codemirror/lib/codemirror.js',
        'public/components/angular-ui-codemirror/ui-codemirror.js',
        'public/components/codemirror/lib/codemirror.css',
        'public/components/mermaid/dist/mermaid.slim.js'
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
              res.write('<script> setTimeout(function(){location="http://localhost:3003"},3000);</script>');
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

    /**
     * 暂不适用,与vivus 冲突去除了自定义属性设置
     */
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
            '{,*/**/}*.{js}'
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
      svgs: {
        files: [{
          expand: true,
          cwd: 'public/svg',
          src: '{,*/}*.svg',
          dest: '<%= appCon.dist %>/public/svg'
        }]
      },
      // favicon.ico
      imgs: {
        files: [{
          expand: true,
          cwd: 'public/img',
          src: '{,*/}*.*',
          dest: '<%= appCon.dist %>/public/img'
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
        },{
          expand: true,
          cwd:'public/css/admin/',
          src:'tinymceCommon.css',
          dest:'<%= appCon.dist %>/public/css/admin'
        }
        ]
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
      },
      adminExtend: {
        files:[
          {
            expand: true,
            cwd:'<%= appCon.adminExtendJs %>',
            src: '*.*',
            dest: '<%= appCon.dist %>/<%= appCon.adminExtendJs %>'
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
        preserveComments:false
      }
    },
    filerev: {
       scripts: {
         src: [
           '<%= appCon.dist %>/public/scripts/**/**.js',
           '<%= appCon.dist %>/angular/scripts/**/**.js',
         ]
       },
       css: {
         src:[
           '<%= appCon.dist %>/public/css/**/**.css'
         ]
       }
    },
    useminPrepare :{
      // home: [
      //     '<%= appCon.dist %>/<%= appCon.clientHomeTemp %>/index.html'
      // ],
      admin: [
        '<%= appCon.dist %>/<%= appCon.clientAdminTemp %>/index.html'
      ],
      options: {
        dest: '<%= appCon.dist %>'
      }
    },
    usemin: {
      // home: [
      //   '<%= appCon.dist %>/<%= appCon.clientHomeTemp %>/index.html'
      // ],
      admin: [
        '<%= appCon.dist %>/<%= appCon.clientAdminTemp %>/index.html'
      ],
      options: {
          assetsDirs: ['<%= appCon.dist %>']
      }
    },

    // 并行任务
    concurrent: {
      dist: [
        'sass',
        'imagemin'
        // 'svgmin'
      ]
    },
    // md5 文件
    // filerev: {
    //   basejs: {
    //     src: ['<%= appCon.dist %>/{,*/**/}*.js'],
    //     dest: '<%= appCon.dist %>'
    //   }
    // },

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

// grunt-usemin (useminPrepare, usemin)
  grunt.registerTask('build', '项目生成',[
    'clean',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'copy',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('test_usemin', '测试usemin',[
    'clean',
    'copy:angulardist',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'cssmin:generated',
    'filerev',
    'usemin'
  ]);

};
