import express from 'express';

import basicMiddleware from './global/Basic';
import statusMonitorMiddleware from './global/status-monitor/StatusMonitor';
import swaggerMiddleware from './global/Swagger';
import morganMiddleware from './global/Morgan';

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
