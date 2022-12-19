import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const basicMiddleware = (app: express.Application) => {
  app.enable('trust proxy');
  app.use(express.json());
  app.set('etag', false);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.set('etag', false);
  app.use(cors());
  app.use(helmet());
  app.use(compression());
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
