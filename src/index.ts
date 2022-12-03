import 'module-alias/register';
import 'reflect-metadata';

import * as dotenv from 'dotenv';

import { InversifyConfigContainer } from '@ioc/ioc-config';
import { InversifyExpressServer } from 'inversify-express-utils';
import Middleware from '@shared-infra/http/middleware';
import { MongoDbConnection } from '@shared-infra/persistence/mongo/db';
import { logger } from '@core/logger/logger';
dotenv.config();
const port = process.env.PORT;

const expressApp = (async (): Promise<void> => {
  /* Setting up IoC */
  const containerConfig: any = await InversifyConfigContainer();
  const server = new InversifyExpressServer(containerConfig, null, {
    rootPath: '/api/v1'
  });

  /* Adding middleware to express server */
  server.setConfig((app) => {
    new Middleware(app);
  });

  /* Mongo db connection to server */
  MongoDbConnection.initConnection()
    .then(async () => {
      MongoDbConnection.setAutoReconnect();
      const serverInstance = await server.build();
      serverInstance.listen(port, () => {
        logger.info(`Server running at http://127.0.0.1:${port}/`);
      });
    })
    .catch((error) => {
      logger.error(error);
    });
})();

expressApp;
