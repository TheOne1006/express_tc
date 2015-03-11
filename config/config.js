var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-tc'
    },
    port: 3000,
    /**
     * 监听12345端口  1
     */
    db: 'mongodb://root:root@ds033601.mongolab.com:33601/theblog',
    debug : true
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-tc'
    },
    port: 3000,
    db: 'mongodb://localhost/express-tc-test',
    debug : false
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-tc'
    },
    port: 3000,
    db: 'mongodb://localhost/express-tc-production',
    debug : false
  }
};

module.exports = config[env];
