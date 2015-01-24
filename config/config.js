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
    db: 'mongodb://127.0.0.1:12345'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-tc'
    },
    port: 3000,
    db: 'mongodb://localhost/express-tc-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-tc'
    },
    port: 3000,
    db: 'mongodb://localhost/express-tc-production'
  }
};

module.exports = config[env];
