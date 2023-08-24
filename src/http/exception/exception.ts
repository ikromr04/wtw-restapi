import { inject, injectable } from 'inversify';
import { ExceptionInterface } from './exception.interface.js';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class Exception implements ExceptionInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register Exception');
  }

  catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
}
