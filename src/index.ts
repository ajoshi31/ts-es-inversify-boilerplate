import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as dotenv from 'dotenv';

import './controller/user';
import * as express from 'express';
import { InversifyConfigContainer } from './di-config';

const expressApp = (async (): Promise<void> => {
  dotenv.config();
  const containerConfig: any = await InversifyConfigContainer();
  const server = new InversifyExpressServer(containerConfig, null, {
    rootPath: '/api/v1'
  });

  const port = process.env.PORT;
  server.setConfig((app) => {
    app.use(
      express.urlencoded({
        extended: true
      })
    );
    app.use(express.json());
  });
  const serverInstance = await server.build();
  serverInstance.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
})();

expressApp;
