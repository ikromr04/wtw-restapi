import { Request, Response, Router } from 'express';
import { HttpMethod } from '../../types/http-method.type.js';
import { MiddlewareInterface } from '../middlewares/middleware.interface.js';

export interface RouterInterface {
  readonly router: Router;
  addRoute(
    path: string,
    method: HttpMethod,
    handler: (req: Request, res: Response) => void,
    middlewares?: MiddlewareInterface[],
  ): void;
}
