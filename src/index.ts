import 'module-alias/register';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as dotenv from 'dotenv';
import { InversifyConfigContainer } from '@ioc/ioc-config';
import Middleware from '@shared-infra/http/middleware';
import { logger } from '@core/logger/logger';
import { MongoDbConnection } from '@shared-infra/persistence/mongo/db';

const expressApp = (async (): Promise<void> => {
  dotenv.config();
  const containerConfig: any = await InversifyConfigContainer();
  const server = new InversifyExpressServer(containerConfig, null, {
    rootPath: '/api/v1'
  });
  const port = process.env.PORT;
  server.setConfig((app) => {
    new Middleware(app);
  });

  MongoDbConnection.initConnection()
    .then(async () => {
      MongoDbConnection.setAutoReconnect();
      /**
       * Configure error handler
       */

      const serverInstance = await server.build();
      serverInstance.listen(port, () => {
        logger.info(`Server running at http://127.0.0.1:${port}/`);
      });
    })
    .catch((error) => {
      console.error(error);
    });
})();

expressApp;
