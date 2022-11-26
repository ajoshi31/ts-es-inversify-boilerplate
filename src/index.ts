import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as dotenv from 'dotenv';
import { InversifyConfigContainer } from './di-config';
import { logger } from './core/logger/logger';
import Middleware from './middleware';

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
  const serverInstance = await server.build();

  serverInstance.listen(port, () => {
    logger.info(`Server running at http://127.0.0.1:${port}/`);
  });
})();

expressApp;
