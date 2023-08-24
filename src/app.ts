import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Component } from './types/component.type.js';
import { LoggerInterface } from './logger/logger.interface.js';
import { ConfigInterface } from './config/config.interface.js';
import { RouterInterface } from './http/router/router.interface.js';
import cors from 'cors';
import { ExceptionInterface } from './http/exception/exception.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.ApiRouter) private apiRouter: RouterInterface,
    @inject(Component.ExceptionInterface) private exception: ExceptionInterface,
  ) {
    this.expressApp = express();
  }

  public initMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
  }

  public initRoutes() {
    this.expressApp.use('/api', this.apiRouter.router);
  }

  public initExceptions() {
    this.expressApp.use(this.exception.catch.bind(this.exception));
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization...');

    this.initMiddlewares();
    this.initRoutes();
    this.initExceptions();

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://${this.config.get('HOST')}:${this.config.get('PORT')}`);
  }
}
