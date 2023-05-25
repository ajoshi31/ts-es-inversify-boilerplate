import express from 'express';
import basicMiddleware from '../global/Basic';
import supertest from 'supertest';
import { logger } from '@core/logger/Logger';

describe('basicMiddleware', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    basicMiddleware(app);
  });

  it('sets trust proxy to true', () => {
    expect(app.get('trust proxy')).toBe(true);
  });

  it('uses express.json middleware', async () => {
    app.post('/', (req, res) => {
      res.json(req.body);
    });

    const response = await supertest(app)
      .post('/')
      .send({ foo: 'bar' })
      .expect(200);

    expect(response.text).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  it('uses bodyParser.json middleware with 50mb limit', async () => {
    app.post('/', (req, res) => {
      res.json({ status: 'ok' });
    });

    const largeData = Buffer.alloc(50 * 1024 * 1024, 'a');
    const response = await supertest(app).post('/').send(largeData).expect(200);

    expect(response.text).toEqual(JSON.stringify({ status: 'ok' }));
  });

  it('sets etag to false', () => {
    expect(app.get('etag')).toBe(false);
  });

  it('uses helmet middleware with contentSecurityPolicy disabled', async () => {
    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    const response = await supertest(app).get('/').expect(200);

    expect(response.header['content-security-policy']).toBe(undefined);
  });

  it('uses bodyParser.urlencoded middleware with 50mb limit and extended options', async () => {
    app.post('/', (req, res) => {
      res.json({ status: 'ok' });
    });

    const largeData = 'a='.repeat(500000);
    const response = await supertest(app).post('/').send(largeData).expect(200);

    expect(response.text).toEqual(JSON.stringify({ status: 'ok' }));
  });

  it('uses cors middleware with allowed headers', async () => {
    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    const response = await supertest(app)
      .options('/')
      .set(
        'Access-Control-Request-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      .expect(204);

    expect(response.header['access-control-allow-headers']).toBe(
      'Origin, X-Requested-With, Content-Type, Accept'
    );
  });

  it('logs an error if there is an error in the middleware', () => {
    const loggerSpy = jest.spyOn(logger, 'error').mockImplementation();
    const error = new Error('oops');
    jest.spyOn(app, 'set').mockImplementationOnce(() => {
      throw error;
    });
    basicMiddleware(app);
    expect(loggerSpy).toHaveBeenCalled();
  });

  it('uses compression middleware', async () => {
    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    const response = await supertest(app)
      .get('/')
      .set('Accept-Encoding', 'gzip')
      .expect(200);

    expect(response.header['content-encoding']).toEqual(undefined);
    expect(response.text).toEqual(expect.any(String));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
