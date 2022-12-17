import 'module-alias/register';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import { InversifyConfigContainer } from '@ioc/ioc-config';
import Middleware from '@shared-infra/http/middleware/Index';
import { MongoDbConnection } from '@shared-infra/persistence/mongo/Database';
import { logger } from '@core/logger/Logger';
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
