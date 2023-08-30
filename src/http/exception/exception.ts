import { inject, injectable } from 'inversify';
import { ExceptionInterface } from './exception.interface.js';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../errors/http.error.js';
import { ServiceError } from '../../types/error.type.js';
import ValidationError from '../../errors/validation.error.js';

@injectable()
export default class Exception implements ExceptionInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register Exception');
  }

  private handleServerError(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(`[Server Error] ${error.message}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errorType: ServiceError.ServerError,
        message: error.message,
      });
  }

  private handleValidationError(error: ValidationError, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(`[Validation Error]: ${error.message}`);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        errorType: ServiceError.ValidationError,
        message: error.message,
        errors: error.errors,
      });
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(`[${error.statusCode} ${error.detail}] ${error.message}`);
    res
      .status(error.statusCode)
      .json({
        errorType: ServiceError.HttpError,
        message: error.message,
      });
  }

  public catch(error: Error | HttpError | ValidationError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    } else if(error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleServerError(error, req, res, next);
  }
}
