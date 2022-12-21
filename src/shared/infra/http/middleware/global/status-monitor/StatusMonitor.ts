import auth from 'http-auth';
import express from 'express';
import monitorOptions from './StatusConfig';
/* eslint-disable */
const statusMonitor = require('express-status-monitor')(monitorOptions);
/* eslint-enable */

const basic = auth.basic(
  { realm: 'Monitor Area' },
  function (user, pass, callback) {
    callback(user === 'alpha' && pass === 'alpha');
  }
);

const statusMonitorMiddleware = (app: express.Application) => {
  app.use(statusMonitor.middleware);
  app.get('/status', basic.check(statusMonitor.pageRoute)); // us
};

export default statusMonitorMiddleware;
