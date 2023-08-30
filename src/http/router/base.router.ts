import { Router } from 'express';
import { RouterInterface } from './router.interface.js';
import { injectable } from 'inversify';
import expressAsyncHandler from 'express-async-handler';
import { HttpMethod } from '../../types/http-method.type.js';
import { Request, Response } from 'express-serve-static-core';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { MiddlewareInterface } from '../middlewares/middleware.interface.js';

@injectable()
export default abstract class BaseRouter implements RouterInterface {
  private _router!: Router;

  constructor(
    protected readonly logger: LoggerInterface,
  ) {
    this._router = Router();
  }

  public get router() {
    return this._router;
  }

  public addRoute(
    path: string,
    method: HttpMethod,
    handler: (req: Request, res: Response) => void,
    middlewares?: MiddlewareInterface[],
  ): void {
    const routeHandler = expressAsyncHandler(handler);
    const middlewareHandlers = middlewares?.map(
      (middleware) => expressAsyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewareHandlers ? [...middlewareHandlers, routeHandler] : routeHandler;
    this._router[method](path, allHandlers);
    this.logger.info(`Route registered: ${method.toUpperCase()} ${path}`);
  }
}
