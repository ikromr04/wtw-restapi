import { Request, Response, Router } from 'express';
import { HttpMethod } from '../../types/http-method.type.js';

export interface RouterInterface {
  readonly router: Router;
  addRoute(
    method: HttpMethod,
    path: string,
    handler: (req: Request, res: Response) => void,
  ): void;
}
