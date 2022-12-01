import express from 'express';
import bodyParser from 'body-parser';

import auth from 'http-auth';
import monitorOptions from './status-config';
import morgan from 'morgan';
import * as swagger from 'swagger-express-ts';
import { logger } from '@core/logger/logger';

export default class Middleware {
  basic = auth.basic(
    { realm: 'Monitor Area' },
    function (user, pass, callback) {
      callback(user === 'alpha' && pass === 'alpha');
    }
  );
  winstonStream = {
    write: (message: string) => {
      logger.info(message);
    }
  };
  public app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.initialiseMiddleware();
  }

  private initialiseMiddleware(): void {
    /* Basic express middleware */
    /* eslint-disable */
    const statusMonitor = require('express-status-monitor')(monitorOptions);
    /* eslint-enable */

    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 500000
      })
    );
    this.app.use(
      express.urlencoded({
        extended: true
      })
    );
    this.app.use(express.json());
    this.app.use(morgan('combined', { stream: this.winstonStream }));
    this.app.use('/api-docs/swagger', express.static('swagger'));
    this.app.use(
      '/api-docs/swagger/assets',
      express.static('node_modules/swagger-ui-dist')
    );

    const port = process.env.PORT;
    this.app.use(
      swagger.express({
        definition: {
          info: {
            title: 'TS-ES Boilerplate API Documentation',
            version: '1.0.0'
          },
          externalDocs: {
            url: `http://localhost:${port}/api/v1/`
          },
          basePath: '/api/v1'
        }
      })
    );
    this.app.use(statusMonitor.middleware);
    this.app.get('/status', this.basic.check(statusMonitor.pageRoute)); // us

    return;
  }
}
