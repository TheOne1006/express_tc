var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

require('dotenv').load();

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-tc'
    },
    port: 3000,
    /**
     * 监听12345端口  1 first
     */
    db: process.env.DEV_MONGO_DB_1,
    /**
     * 爱尔兰 db
     *
     */
    // db: process.env.DEV_MONGO_DB_2,
    /**
     * dbest 2
     */
    // db: process.env.DEV_MONGO_DB_3,

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
      name: process.env.PRO_NAME,
      hostname: process.env.PRO_HOSTNAME
    },
    port: 3000,
    db: process.env.PRO_MONGO_DB,
    debug : false
  }
};

module.exports = config[env];
