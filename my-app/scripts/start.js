'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const webpack = require('webpack');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  choosePort
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const config = require('../config/webpack.config.dev');

const app = new express();
const compiler = webpack(config);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
require('./../route/index.js')(app);
// connect to database
mongoose.connect('mongodb://localhost/react');
mongoose.connection
    .on('open',function () {
        process.env.connect_database = 1;
        console.log('connection successful');

    })
    .on('error',function () {
        process.env.connect_database = 0;
      console.log('connection error');

    });
// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    // Create a webpack compiler that is configured with custom messages.

    const devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath
    });
    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {},
      heartbeat: 2000
    });
    app.use(devMiddleware);
    app.use(hotMiddleware);
    app.use(express.static('public'));
    const uri = 'http://localhost:' + port;
    console.log('> Starting dev server...');
    devMiddleware.waitUntilValid(() => {
      console.log('> Listening at ' + uri + '\n');
      // when env is testing, don't need open it
      if ( process.env.NODE_ENV !== 'testing') {
        openBrowser(uri);
      }
    });
  app.listen(port)
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

