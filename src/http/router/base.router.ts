import { Router } from 'express';
import { RouterInterface } from './router.interface.js';
import { injectable } from 'inversify';
import expressAsyncHandler from 'express-async-handler';
import { HttpMethod } from '../../types/http-method.type.js';
import { Request, Response } from 'express-serve-static-core';
import { LoggerInterface } from '../../logger/logger.interface.js';

@injectable()
export default abstract class BaseRouter implements RouterInterface {
  private _router!: Router;

  constructor(
    protected readonly logger: LoggerInterface,
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(
    method: HttpMethod,
    path: string,
    handler: (req: Request, res: Response) => void,
  ): void {
    this._router[method](path, expressAsyncHandler(handler));
    this.logger.info(`Route registered: ${method.toUpperCase()} ${path}`);
  }
}
