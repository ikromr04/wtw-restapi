import { inject, injectable } from 'inversify';
import AbstractRouter from './abstract.router.js';
import { Component } from '../../types/component.js';
import { LoggerInterface } from '../../logger/logger.interface.js';

@injectable()
export default class ApiRouter extends AbstractRouter {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {
    super();

    // api routes

    this.logger.info('API routes registered');
  }
}
