import bodyParser from 'body-parser';
import express from 'express';

const basicMiddleware = (app: express.Application) => {
  app.enable('trust proxy');
  app.use(express.json());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.set('etag', false);
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

  return app;
};

export default basicMiddleware;
