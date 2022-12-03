import basicMiddleware from './global/basic';
import express from 'express';

import statusMonitorMiddleware from './global/status-monitor/status-monitor';
import swaggerMiddleware from './global/swagger';
import morganMiddleware from './global/morgan';

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
