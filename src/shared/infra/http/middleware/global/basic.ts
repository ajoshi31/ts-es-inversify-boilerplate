import bodyParser from 'body-parser';
import express from 'express';

const basicMiddleware = (app: express.Application) => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 500000
    })
  );
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(express.json());

  return app;
};

export default basicMiddleware;
