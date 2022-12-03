import basicMiddleware from './global/basic';
import express from 'express';
import morganMiddleware from './global/morgan';
import statusMonitorMiddleware from './global/status-monitor/status-monitor';
import swaggerMiddleware from './global/swagger';

export default class Middleware {
  public app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.initialiseMiddleware();
  }

  private initialiseMiddleware(): void {
    basicMiddleware(this.app);
    morganMiddleware(this.app);
    statusMonitorMiddleware(this.app);
    swaggerMiddleware(this.app);
    return;
  }
}
