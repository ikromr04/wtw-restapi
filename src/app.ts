import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Component } from './types/component.js';
import { LoggerInterface } from './logger/logger.interface.js';
import { ConfigInterface } from './config/config.interface.js';
import { RouterInterface } from './http/router/router.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.ApiRouter) private apiRouter: RouterInterface,
  ) {
    this.expressApp = express();
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization...');

    this.expressApp.use('/api', this.apiRouter.router);

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://${this.config.get('HOST')}:${this.config.get('PORT')}`);
  }
}
