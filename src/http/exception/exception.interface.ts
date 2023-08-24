import { NextFunction, Request, Response } from 'express';

export interface ExceptionInterface {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}
