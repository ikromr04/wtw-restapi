import { Response } from 'express';
import { ControllerInterface } from './controller.interface.js';
import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default abstract class BaseController implements ControllerInterface {
  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
