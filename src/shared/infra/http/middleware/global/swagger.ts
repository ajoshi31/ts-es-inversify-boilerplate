import * as swagger from 'swagger-express-ts';

import express from 'express';
const swaggerMiddleware = (app: express.Application) => {
  const port = process.env.PORT;
  app.use('/api-docs/swagger', express.static('swagger'));
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  );

  app.use(
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
};

export default swaggerMiddleware;
